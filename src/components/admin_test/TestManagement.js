import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { connect } from 'react-redux'
import { connectToQuestion, loadQuestions, startQuestion, nextQuestion } from '../../store/actions/testActions'
import { button } from '../css/Styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { progress_root } from '../css/Styles'
import classNames from 'classnames'
import Divider from '@material-ui/core/Divider'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles(theme => ({
    button: button(theme),
    secondaryButton: button(theme),
    typoTitle: {
        fontWeight: 600,
    },
    progress_root,
    typoHead: {
        marginBottom: theme.spacing(2),
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: 350,
    },
    btnMargin: {
        marginTop: 'auto'
    },
    divider: {
        margin: `${theme.spacing(1)}px 0px`
    },

}))
const TestManagement = ({ test, selected_question, connectToQuestion, loadQuestions, questions, startQuestion, nextQuestion }) => {
    const classes = useStyles();
    const [question, setQuestion] = useState(null);
    const [questionList, setList] = useState(null);
    const [progress, setProgress] = useState('');
    const [remaining, setRemaining] = useState(0);

    useEffect(() => {
        const { current_order, id } = test;
        connectToQuestion(id, current_order);
    }, [test, connectToQuestion]);

    useEffect(() => {
        if (selected_question) {
            setQuestion(selected_question);
        }
    }, [selected_question]);

    useEffect(() => {
        //Set question list.
        if (!questions) loadQuestions(test.id);
        else {
            setList(questions);

        }

    }, [questions, loadQuestions, test.id]);

    useEffect(() => {
        //update progress
        if (question && questionList) {
            const { current_order } = test;

            let idx = questionList.findIndex(item => (
                item.order === current_order
            ));

            setProgress(`${idx + 1}/${questionList.length}`);

        }
    }, [question, questionList, test])

    useEffect(() => {
        if (question && question.state === 1 && remaining === 0) {
            const interval = 250;
            let add_value = Math.ceil(interval / (test.limit_time * 1000) * 100);

            const setTimer = () => {
                setRemaining(oldRemaining => {
                    if (oldRemaining >= 100) {
                        clearInterval(timer);
                        return 0;
                    }

                    return oldRemaining + add_value;
                })
            }

            let timer = setInterval(setTimer, interval);
        }
    }, [question, test.limit_time])

    //If the question is not yet loaded.
    if (!question || !questionList) {
        return (
            <div className={classes.progress_root} style={{ flexDirection: 'column' }}>
                <Typography variant="body1">
                    Connecting to the question...
                </Typography>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <Typography variant="h6" component="h6" align="center" className={classes.typoHead} gutterBottom>
                {`Question In Progress (${progress})`}
            </Typography>
            <Typography variant="body1" className={classes.typoTitle} gutterBottom>
                {question.title}
            </Typography>
            <Typography variant="body1" >
                {question.content}
            </Typography>

            <Divider className={classes.divider} />

            <Typography variant="body1">
                {`test_type: ${question.is_test === 0 ? `Normal` : `Test Question`}`}
            </Typography>
            <Typography variant="body1">
                {`Order: ${question.order}`}
            </Typography>
            <Typography variant="body1">
                {`State: ${question.state}`}
            </Typography>
            <Typography variant="body1">
                {`Number of selections: ${question.selections.length}`}
            </Typography>
            <Typography variant="body1">
                {`Answered: ${question.answered}`}
            </Typography>

            <div className={classes.btnMargin}>
                {question.state === 0 &&
                    <Button fullWidth className={classNames(classes.button)} onClick={() => startQuestion(test, question.id)}>
                        Start
                    </Button>
                }
                {question.state === 1 &&
                    <LinearProgress color="primary" variant="determinate" value={remaining} />
                }
                {question.state === 2 && 
                    <Button fullWidth className={classes.button} onClick={() => nextQuestion(test)}>
                        Next Question
                    </Button>
                }
            </div>

        </div>
    )
}


const mapStateToProps = state => {
    const { selected_question, questions } = state.test;
    return {
        selected_question,
        questions,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        connectToQuestion: (test_id, question_order) => dispatch(connectToQuestion(test_id, question_order)),
        loadQuestions: (test_id) => dispatch(loadQuestions(test_id)),
        startQuestion: (test, question_id) => dispatch(startQuestion(test, question_id)), 
        nextQuestion: (test) => dispatch(nextQuestion(test))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TestManagement)
