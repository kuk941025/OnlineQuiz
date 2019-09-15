import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { connectToQuestion, submitAnswer, disconnectToQuestion } from '../../store/actions/userActions'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { button, progress_root, secondaryButton } from '../css/Styles'
import Button from '@material-ui/core/Button'
import Grey from '@material-ui/core/colors/grey'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'
import LinearProgress from '@material-ui/core/LinearProgress'
import AnswerPicker from '../util/AnswerPicker'
import moment from 'moment'
import AnswerCompleted from './AnswerCompleted'

const useStyles = makeStyles(theme => ({
    root: {
        height: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflowY: 'auto',
        minHeight: 600,
    },
    typoTitle: {
        fontWeight: 600,
        margin: `${theme.spacing(1)}px 0px`
    },
    questionRoot: {
        height: '20%',
        border: `1px solid ${Grey['300']}`,
        padding: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column'
    },
    answerRoot: {
        height: '65%',
        border: `1px solid ${Grey['300']}`,
        padding: theme.spacing(1),
    },
    button: button(theme),
    progress_root,
    divider: {
        margin: `${theme.spacing(1)}px 0px`
    },
    textField: {
        margin: `${theme.spacing(1)}px 0px`
    },
    progressRoot: {
        marginTop: 'auto'
    },
    questionHidden: {
        margin: 'auto',
        color: Grey['500']
    },
    secondaryButton: secondaryButton(theme),
}))

const AnswerQuestion = ({ test, questions, connectToQuestion, selected_question, submitAnswer, disconnectToQuestion }) => {
    const classes = useStyles();
    const [questionList, setList] = useState([]);
    const [question, setQuestion] = useState(null);
    const [progress, setProgress] = useState('');
    const [answer, setAnswer] = useState('');
    const [radio, setRadio] = useState('');
    const [remaining, setRemaining] = useState(0);
    const [showPicker, setPicker] = useState(true);
    const [startedTime, setStarted] = useState(null);
    const [timer, setLocalTimer] = useState(null);

    useEffect(() => {
        if (questions) setList(questions);

    }, [questions]);

    useEffect(() => {
        connectToQuestion(test);

        return () => {
            disconnectToQuestion();
        }
    }, [test.current_order]);

    useEffect(() => {
        if (selected_question) {
            setQuestion(selected_question);

            console.log(selected_question);
            const { state } = selected_question;
            if (state == 0) {
                setPicker(true);
            }
            else setPicker(false);


            if (state === 1) {
                //if started accepting response, run timer.
                const interval = 250;
                let add_value = Math.ceil(interval / (test.limit_time * 1000) * 100);

                if (!timer) {
                    const setTimer = () => {
                        setRemaining(oldRemaining => {
                            if (oldRemaining >= 100) {
                                clearInterval(t);
                                setPicker(false);
                                setLocalTimer(null);
                                return 0;
                            }
                            return oldRemaining + add_value;
                        })
                    };
                    let t = setInterval(setTimer, interval);
                    setLocalTimer(t);

                    //start recording time
                    setStarted(moment(new Date()));
                    setPicker(true);
                }
            }

        }
    }, [selected_question]);

    useEffect(() => {
        if (questionList) {
            let idx = questionList.findIndex(item => (
                item.order === test.current_order
            ));

            setProgress(`${idx + 1}/${questionList.length}`);
        };

    }, [test.current_order, questionList])



    const handleChange = e => {
        setRadio(e.target.value);
    }
    const handleAutoComplete = input => {
        setAnswer(input);
    }

    const handleSubmit = e => {
        e.preventDefault();
        let input = answer;
        if (radio !== '') input = radio;

        if (input === '') {
            alert("답을 입력해주세요.");
            return;
        }

        let ans = question.selections.find(item => (
            item.title === input || item.subtitle === input
        ));

        if (ans) {
            let curTime = moment(new Date());

            let diff = curTime.diff(startedTime, 'milliseconds');
            console.log(diff);
            submitAnswer(test.id, question.id, ans.title, diff);
            setPicker(false);
        }
        else alert("잘못된 입력입니다.");
    }

    if (!question) {
        return (
            <div className={classes.progress_root}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <div className={classes.questionRoot}>
                <LinearProgress variant="determinate" value={remaining} />
                {question.state === 0 &&
                    <div className={classes.questionHidden}>
                        <Typography variant="body1" align="center">
                            문제 비공개
                        </Typography>
                    </div>
                }
                {question.state >= 1 &&
                    <React.Fragment>
                        <Typography variant="body1" className={classes.typoTitle} gutterBottom>
                            {question.title}
                        </Typography>
                        <Typography variant="body1">
                            {question.content}
                        </Typography>
                    </React.Fragment>
                }

                <div className={classes.progressRoot}>
                    <Typography variant="body1" align="right">
                        {progress}
                    </Typography>
                </div>
            </div>
            <Divider className={classes.divider} />


            {/* Picker */}
            {showPicker ? (
                <React.Fragment>
                    <div className={classes.answerRoot}>
                        <Typography variant="body1" className={classes.typoTitle} gutterBottom>
                            정답 선택
                        </Typography>

                        <AnswerPicker
                            onSubmit={handleSubmit}
                            answer={answer}
                            onChange={handleChange}
                            onAuto={handleAutoComplete}
                            selections={question.selections}
                            disabled={question.state >= 1 ? false : true} />

                    </div>
                    <div>
                        <Button
                            className={question.state >= 1 ? classes.button : classes.secondaryButton}
                            fullWidth onClick={handleSubmit}
                            disabled={question.state >= 1 ? false : true}>
                            제출
                        </Button>
                    </div>
                </React.Fragment>
            ) : (
                    <div className={classes.answerRoot}>
                        <AnswerCompleted question={question} test={test} />
                    </div>
                )}



        </div>
    )
}

const mapStateToProps = state => {
    const { questions, selected_question } = state.user;
    return {
        questions,
        selected_question
    }
}

const mapDispatchToProps = dispatch => {
    return {
        connectToQuestion: test => dispatch(connectToQuestion(test)),
        submitAnswer: (test_id, question_id, answer, time) => dispatch(submitAnswer(test_id, question_id, answer, time)),
        disconnectToQuestion: () => dispatch(disconnectToQuestion()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerQuestion)

AnswerQuestion.propTypes = {
    test: PropTypes.object.isRequired
}