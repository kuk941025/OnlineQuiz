import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { progress_root } from '../css/Styles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadQuestions } from '../../store/actions/testActions'
import UtilList from '../util/UtilList'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
    progress_root,
    root: {
        overflowY: 'auto', 
        height: 250,
        border: `1px solid #eee`
    }
}));

const QuestionList = ({ test_id, loadQuestions, questions }) => {
    const classes = useStyles();
    const [questionList, setList] = useState(null);

    useEffect(() => {
        loadQuestions(test_id);
    }, [loadQuestions, test_id])

    useEffect(() => {
        console.log(questions);
        if (questions) {
            let list = questions.map(question => ({
                title: question.title,
                subtitle: question.content,
            }));

            setList(list);
        }
    }, [questions]);

    return (
        <React.Fragment>
            {questionList ? (
                <div className={classes.root}>
                    <UtilList data={questionList} />
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
export default connect(mapStateToProps, mapDispatchToProps)(QuestionList)

QuestionList.propTypes = {
    test_id: PropTypes.string.isRequired
}