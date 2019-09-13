import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import { button, secondaryButton, ListCSS } from '../css/Styles'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { updateTestState, loadQuestions } from '../../store/actions/testActions'
import UtilList from '../util/UtilList'


const useStyles = makeStyles(theme => ({
    root: {
        minHeight: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
    },
    btnRoot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: theme.spacing(1),
    },
    button: button(theme),
    btn: {
        width: '45%',
        minWidth: 200,
        margin: theme.spacing(1),
    },
    secondaryButton: secondaryButton(theme),
    list: ListCSS,
}))
const TestReady = ({ test, updateTestState, questions, loadQuestions }) => {
    const classes = useStyles();
    const [questionList, setList] = useState([]);

    const handleBack = () => {
        updateTestState(test.id, -1);
    }

    useEffect(() => {
        if (questions) {
            let list = questions.map((question, idx)=> ({
                title: `${idx + 1}. ${question.title}`,
                subtitle: question.content,
            }));

            setList(list);
        }
        else loadQuestions(test.id);

    }, [questions, loadQuestions])
    return (
        <div>
            <div className={classes.root}>
                <Typography variant="body1">
                    Waiting for users...
                </Typography>
                <Typography variant="body1">
                    {`Current users: ${test.users_in}`}
                </Typography>
                <div className={classes.btnRoot}>
                    <Button className={classNames(classes.secondaryButton, classes.btn)} onClick={handleBack}>
                        Go back
                    </Button>
                    <Button className={classNames(classes.button, classes.btn)}>
                        Start
                    </Button>
                </div>

            </div>

            <Typography variant="body1" gutterBottom>
                Question List
            </Typography>
            <div className={classes.list}>
                <UtilList data={questionList} />
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        updateTestState: (test_id, state) => dispatch(updateTestState(test_id, state)),
        loadQuestions: test_id => dispatch(loadQuestions(test_id)), 
    }
}

const mapStateToProps = state => {
    return {
        questions: state.test.questions,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TestReady)


TestReady.propTypes = {
    test: PropTypes.object.isRequired,

}