import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { connectToQuestion } from '../../store/actions/userActions'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { button, progress_root } from '../css/Styles'
import Button from '@material-ui/core/Button'
import Grey from '@material-ui/core/colors/grey'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'
import LinearProgress from '@material-ui/core/LinearProgress'
import AnswerPicker from '../util/AnswerPicker'

const useStyles = makeStyles(theme => ({
    root: {
        height: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
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
        height: '70%',
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
    }
}))

const AnswerQuestion = ({ test, questions, connectToQuestion, selected_question }) => {
    const classes = useStyles();
    const [questionList, setList] = useState([]);
    const [question, setQuestion] = useState(null);
    const [progress, setProgress] = useState('');

    useEffect(() => {
        if (questions) setList(questions);

        console.log(questions);
    }, [questions]);

    useEffect(() => {
        connectToQuestion(test);
        console.log('called`');
    }, [test.current_order]);

    useEffect(() => {
        if (selected_question) setQuestion(selected_question);
        console.log(selected_question);
    }, [selected_question]);

    useEffect(() => {
        if (questionList) {
            let idx = questionList.findIndex(item => (
                item.order === test.current_order
            ));

            setProgress(`${idx + 1}/${questionList.length}`);
        };

    }, [test.current_order, questionList])

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
                <LinearProgress variant="determinate" value={0} />
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
            <div className={classes.answerRoot}>
                <Typography variant="body1" className={classes.typoTitle} gutterBottom>
                    정답 선택
                </Typography>

                <AnswerPicker selections={question.selections} disabled={question.state === 1 ? false : true} />
            </div>
            <Button className={classes.button} fullWidth>
                제출
            </Button>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerQuestion)

AnswerQuestion.propTypes = {
    test: PropTypes.object.isRequired
}