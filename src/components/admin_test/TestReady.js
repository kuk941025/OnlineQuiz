import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import { button, secondaryButton, ListCSS } from '../css/Styles'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { updateTestState, nextQuestion } from '../../store/actions/testActions'
import QuestionList from './QuestionList'

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
        margin: theme.spacing(1),
    },
    secondaryButton: secondaryButton(theme),
    list: ListCSS,
}))

const TestReady = ({ test, updateTestState, nextQuestion }) => {
    const classes = useStyles();


    const handleBack = () => {
        updateTestState(test.id, -1);
    }

    const handleStart = () => {
        nextQuestion();
    }

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
                    <Button className={classNames(classes.button, classes.btn)} onClick={handleStart}>
                        Start
                    </Button>
                </div>

            </div>

            <Typography variant="body1" gutterBottom>
                Question List
            </Typography>

            <QuestionList test_id={test.id} read_only={true} />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        updateTestState: (test_id, state) => dispatch(updateTestState(test_id, state)),
        nextQuestion: () => dispatch(nextQuestion()),
    }
}


export default connect(null, mapDispatchToProps)(TestReady)


TestReady.propTypes = {
    test: PropTypes.object.isRequired,

}