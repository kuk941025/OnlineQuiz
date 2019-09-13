import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { progress_root } from '../css/Styles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadQuestions } from '../../store/actions/testActions'
import UtilList from '../util/UtilList'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    progress_root,
    root: {
        overflowY: 'auto',
        height: 250,
        border: `1px solid #eee`
    }
}));

const QuestionList = ({ test_id, loadQuestions, questions, history, read_only }) => {
    const classes = useStyles();
    const [questionList, setList] = useState(null);

    useEffect(() => {
        loadQuestions(test_id);
    }, [loadQuestions, test_id])

    useEffect(() => {

        if (questions) {
            let list = questions.map((question, idx) => ({
                title: `${idx + 1}. ${question.is_test === 1 ? ` [TEST] ` : ``}${question.title}`,
                subtitle: question.content,
                id: question.id, 
            }));

            setList(list);
        }
    }, [questions]);

    const handleOnQuestionClicked = (id) => {
        history.push(`/admin/test/${test_id}/question/${id}`);
    }


    return (
        <React.Fragment>
            {questionList ? (
                <div className={classes.root}>
                    <UtilList data={questionList} onClick={read_only ? null : handleOnQuestionClicked} />
                </div>
            ) : (
                    <div className={classes.progress_root}>
                        <CircularProgress />
                    </div>
                )}
        </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        loadQuestions: test_id => dispatch(loadQuestions(test_id)),
    }
}

const mapStateToProps = state => {
    return {
        questions: state.test.questions,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(QuestionList))

QuestionList.propTypes = {
    test_id: PropTypes.string.isRequired,
    read_only: PropTypes.bool.isRequired, 
}