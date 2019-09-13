import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { progress_root, secondaryButton } from '../css/Styles'
import { connect } from 'react-redux'
import { loadQuestion, removeQuestion } from '../../store/actions/testActions'
import Typography from '@material-ui/core/Typography'
import Question from './Question'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
    progress_root,
    button: {
        ...secondaryButton(theme),
        marginTop: 0, 
    },
}))

//Edit Questin
const EditQuestion = ({ history, match, loadQuestion, question, result, removeQuestion }) => {
    const classes = useStyles();
    const [data, setData] = useState(null);
    const [msg, setMsg] = useState('');
    const { test_id, question_id } = match.params;

    useEffect(() => {


        loadQuestion(test_id, question_id);
    }, [match.params]);


    useEffect(() => {
        if (result.startsWith('SUCCESS')) {
            setData({
                ...question,
                id: question_id,
            });
        }
        else if (result.startsWith('FAIL')) {
            setData([]);
            setMsg('Not a valid question id')
        }
    }, [question, result]);

    const handleGoBack = () => {
        history.push(`/admin/test/${match.params.test_id}`);
    };

    const handleRemove = () => {
        removeQuestion(test_id, question_id);
        alert('Removed.')
        history.push(`/admin/test/${match.params.test_id}`);
    }
    return (
        <div style={{ minHeight: 250 }} >
            <Button variant="outlined" onClick={handleGoBack}>
                Go back
            </Button>
            {!data && <div className={classes.progress_root}><CircularProgress /></div>}
            {data && msg === '' && <Question mode={1} test_id={match.params.test_id} selected_question={data} />}
            {data && msg === '' && <Button fullWidth className={classes.button} onClick={handleRemove}>Delete</Button>}
            <Typography variant="body1" color="error" align="center">
                {msg}
            </Typography>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        loadQuestion: (test_id, question_id) => dispatch(loadQuestion(test_id, question_id)),
        removeQuestion: (test_id, question_id) => dispatch(removeQuestion(test_id, question_id)),
    }
}
const mapStateToProps = (state) => {
    return {
        question: state.test.selected_question,
        result: state.test.selected_question_result,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditQuestion)
