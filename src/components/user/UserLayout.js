import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import JoinTest from './JoinTest'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    link: {
        fontSize: '0.8rem',
        marginBottom: theme.spacing(1),
    }
}))
const UserLayout = ({ match, signOut, auth }) => {
    const classes = useStyles();
    const [state, setState] = useState(-1);


    useEffect(() => {
        if (match.path.startsWith('/join')) setState(0);
    }, [match.path]);


    if (!auth.uid) return <Redirect to="/" />
    return (
        <div>

            <Link color="primary" onClick={signOut} className={classes.link}>
                로그아웃
            </Link>
            <Paper className={classes.root}>
                {state === 0 && <JoinTest />}

            </Paper>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut()),
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserLayout)
