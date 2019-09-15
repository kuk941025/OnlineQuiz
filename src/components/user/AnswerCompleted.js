import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { connectToAnswer, initAnswer } from '../../store/actions/userActions'
import { progress_root } from '../css/Styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    progress_root
}))
const AnswerCompleted = ({ test, question, connectToAnswer, answer }) => {
    const classes = useStyles();
    const [answerData, setAnswer] = useState(null);

    useEffect(() => {
        if (question.state === 2){
            connectToAnswer(test.id, question.id);
        };

        return () => {
            initAnswer();
        }
    }, [question.state]);

    useEffect(() => {
        if (answer) setAnswer(answer)
    }, [answer])

    return (
        <div className={classes.root}>
            <div>
                {question.state === 2 ? (
                    <React.Fragment>
                        {answerData ? (
                            <div>
                                <Typography variant="body1">
                                    {`순위: ${answer.rank}위`}
                                </Typography>
                            </div>
                        ) : (
                            <div className={classes.progress_root}>
                                <CircularProgress />
                            </div>
                        )}
                    </React.Fragment>
                ) : (
                        <React.Fragment>
                            <Typography variant="body1">
                                투표가 진행중입니다.
                            </Typography>
                            <Typography variant="body1" >
                                {`남은 인원: ${test.users_in - question.answered}명`}
                            </Typography>
                        </React.Fragment>
                    )}


            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        connectToAnswer: (test_id, question_id) => dispatch(connectToAnswer(test_id, question_id)), 
    }
}

const mapStateToProps = state => {
    return {
        answer: state.user.answer, 
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AnswerCompleted)
