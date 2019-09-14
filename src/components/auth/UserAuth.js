import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import LockIcon from '@material-ui/icons/Lock'
import Paper from '@material-ui/core/Paper'
import Blue from '@material-ui/core/colors/blue'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { button } from '../css/Styles'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
        minHeight: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        height: 42,
        width: 42,
        color: Blue['200']
    },
    textField: {
        width: '100%',
        minWidth: 150,
    },
    button: {
        ...button(theme),
        marginTop: theme.spacing(1),
    },
    innerRoot: {
        width: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    link: {
        marginLeft: 'auto',
        fontSize: '0.9rem',
        marginBottom: theme.spacing(1)
    },
    typoRoot: {
        height: 20,
        width: '100%'
    }
}))
const UserAuth = ({ auth_error, signIn, auth, history }) => {
    const classes = useStyles();
    const [phone, setPhone] = useState('');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        setMsg(auth_error);
    }, [auth_error])

    const handleChange = e => {
        setPhone(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        signIn(phone);
    }
    
    const handleLink = () => {
        history.push('/sign_up')
    }

    if (auth.uid) return <Redirect to="/join" />
    return (

        <Paper className={classes.root}>
            <form className={classes.innerRoot} onSubmit={handleSubmit}>
                <LockIcon className={classes.icon} />
                <TextField
                    id="phone_num"
                    label="핸드폰 번호"
                    margin="normal"
                    placeholder="-없이 입력"
                    className={classes.textField}
                    type="number"
                    value={phone}
                    onChange={handleChange}
                />
                <Link color="primary" onClick={handleLink} className={classes.link}>
                    회원가입
                </Link>

                <div className={classes.typoRoot}>
                    <Typography variant="body1" color="error">
                        {msg}
                    </Typography>
                </div>
                <Button variant="text" className={classes.button} fullWidth onClick={handleSubmit}>
                    로그인
                </Button>
            </form>
        </Paper>

    )
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: phone => dispatch(signIn(phone)),
    }
}
const mapStateToProps = state => {
    return {
        auth_error: state.auth.auth_error,
        auth: state.firebase.auth
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserAuth)
