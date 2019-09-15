import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { connect } from 'react-redux'
import { connectToQuestion } from '../../store/actions/testActions'
import { button, secondaryButton } from '../css/Styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { progress_root } from '../css/Styles'
import classNames from 'classnames'
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
        minHeight: 250, 
    },
    btnMargin: {
        marginTop: 'auto'
    }
}))
const TestManagement = ({ test, selected_question, connectToQuestion }) => {
    const classes = useStyles();
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        const { current_order, id } = test;
        connectToQuestion(id, current_order);
    }, [test.current_order]);

    useEffect(() => {
        console.log(selected_question);
        if (selected_question){
            setQuestion(selected_question);
        }
    }, [selected_question])

    if (!question) {
        return (
            <div className={classes.progress_root} style={{flexDirection: 'column'}}>
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
                Question In Progress
            </Typography>
            <Typography variant="body1" className={classes.typoTitle} gutterBottom>
                {question.title}
            </Typography>
            <Typography variant="body1" >
                {question.content}
            </Typography>

            <Button fullWidth className={classNames(classes.button, classes.btnMargin)}>
                Start
            </Button>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        selected_question: state.test.selected_question,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        connectToQuestion: (test_id, question_order) => dispatch(connectToQuestion(test_id, question_order)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TestManagement)
