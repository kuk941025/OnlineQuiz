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
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'

const useStyles = makeStyles(theme => ({
    root: {
        height: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    typoTitle: {
        fontWeight: 600,
    },
    questionRoot: {
        height: '20%',
        border: `1px solid ${Grey['200']}`,
        padding: theme.spacing(1),
    },
    answerRoot: {
        height: '70%',
        border: `1px solid ${Grey['200']}`,
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
    formControl: {
        padding: theme.spacing(1),
        border: `1px solid ${Grey['200']}`,
        overflowY: 'auto',
        height: `calc(100% - 120px)`
    }
}))

const AnswerQuestion = ({ test, questions, connectToQuestion, selected_question }) => {
    const classes = useStyles();
    const [questionList, setList] = useState([]);
    const [question, setQuestion] = useState(null);

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
    }, [selected_question])

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
                <Typography variant="body1" className={classes.typoTitle} gutterBottom>
                    {question.title}
                </Typography>
                <Typography variant="body1">
                    {question.content}
                </Typography>
            </div>
            <Divider className={classes.divider} />
            <div className={classes.answerRoot}>
                <Typography variant="body1" className={classes.typoTitle} gutterBottom>
                    정답 선택
                </Typography>
                <TextField
                    fullWidth
                    label="정답 입력"
                    variant="outlined"
                    placeholder="이름을 입력해주세요.(성없이도 가능)"
                    className={classes.textField}
                />

                <div className={classes.formControl}>
                    <FormControl component="fieldset" >
                        <RadioGroup name="selections">
                            {question.selections.map((item, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    control={<Radio />}
                                    value={item.title}
                                    label={item.title}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </div>

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