import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { button } from '../css/Styles'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerRoot: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '80%'
    },
    title: {
        fontWeight: 600,
    },
    textPhone: {
        marginTop: theme.spacing(1),
    },
    button: button(theme),
    textFirst: {
        width: '20%',
    },
    textLast: {
        width: '70%'
    },
    nameRoot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: `${theme.spacing(1)}px 0px`
    },
    typoRoot: {
        height: 20,
        width: '100%'
    }
}))
const UserSignUp = ({ auth, auth_error, signUp }) => {
    const classes = useStyles();
    const [msg, setMsg] = useState('');
    const [creds, setCreds] = useState({
        phone: '',
        last_name: '',
        first_name: '',
    });

    useEffect(() => {
        setMsg(auth_error);
    }, [auth_error])

    const handleChange = e => {
        setCreds({
            ...creds,
            [e.target.id]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        let is_valid = true;
        Object.keys(creds).forEach(key => {
            if (creds[key] === '') is_valid = false;
        })

        if (!is_valid) setMsg("빈칸을 모두 채워주세요.");
        else {
            if (creds.phone.length < 10 || creds.phone.length > 11) setMsg("잘못된 휴대폰 번호입니다.")
            else signUp(creds);
        }

    }

    if (auth.uid) return <Redirect to="/join" />
    return (
        <Paper className={classes.root}>
            <form onSubmit={handleSubmit} className={classes.innerRoot}>
                <Typography variant="h6" className={classes.title}>
                    회원가입
                </Typography>
                <TextField
                    id="phone"
                    label="휴대폰 번호"
                    fullWidth
                    className={classes.textPhone}
                    placeholder="-없이"
                    value={creds.phone}
                    type="number"
                    onChange={handleChange}
                />

                <div className={classes.nameRoot}>
                    <TextField
                        id="last_name"
                        label="성"
                        className={classes.textFirst}
                        value={creds.last_name}
                        onChange={handleChange}
                    />

                    <TextField
                        id="first_name"
                        label="이름"
                        className={classes.textLast}
                        value={creds.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div className={classes.typoRoot}>
                    <Typography variant="body1" color="error">
                        {msg}
                    </Typography>
                </div>
                <Button fullWidth className={classes.button} onClick={handleSubmit} onSubmit={handleSubmit}>
                    회원가입
                </Button>
            </form>

        </Paper>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: creds => dispatch(signUp(creds))
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        auth_error: state.auth.sign_up_error,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserSignUp)
