import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'
import TestReady from './TestReady'
import { connect } from 'react-redux'
import { connectToTest, initUser, disconnectToServer, loadQuestions } from '../../store/actions/userActions'
import { progress_root } from '../css/Styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import AnswerQuestion from './AnswerQuestion'

const useStyles = makeStyles(theme => ({
    progress_root,
}));

const TakeTest = ({ test_id, connectToTest, test, test_msg, user, loadQuestions }) => {
    const classes = useStyles();
    const [testData, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');


    useEffect(() => {
        //connect to test after user data is loaded.
        if (user) connectToTest(test_id);
        
        return () => {
            disconnectToServer();
        }
    }, [connectToTest, user, test_id, disconnectToServer]);

    useEffect(() => {
        if (test_msg !== '') {
            if (test_msg.startsWith('SUCCESS')) {
                setData(test);
            }
            else {
                setMsg(test_msg);
            }
            setLoading(false);
        }

        return () => {

        }
    }, [test, test_msg]);

    useEffect(() => {
        console.log('called')
        loadQuestions(test_id);
    }, [loadQuestions]);

    return (
        <React.Fragment>
            {loading ? (
                <div className={classes.progress_root}>
                    <CircularProgress />
                </div>
            ) : (
                    <React.Fragment>
                        <Typography variant="body1" color="error" align="center">
                            {msg}
                        </Typography>
                        {test &&
                            <React.Fragment>
                                {test.current_order === 0 && <TestReady test={testData} />}
                                {test.current_order > 0 && <AnswerQuestion test={testData} />}
                            </React.Fragment>
                        }


                    </React.Fragment>
                )}

        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        test: state.user.test,
        test_msg: state.user.test_msg,
        user: state.auth.user,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        connectToTest: (test_id) => dispatch(connectToTest(test_id)),
        initUser: () => dispatch(initUser()),
        loadQuestions: (test_id) => dispatch(loadQuestions(test_id)), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TakeTest)


TakeTest.propTypes = {
    test_id: PropTypes.string.isRequired
}