import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { initTest, analyzeTest } from '../../store/actions/testActions'
import Button from '@material-ui/core/Button'
import { button, secondaryButton } from '../css/Styles'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    typoTitle: {
        fontWeight: 600,
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 250,
        width: '100%',
    },
    button: button(theme),
    secondaryButton: secondaryButton(theme),
}))

const TestComplete = ({ initTest, test, history, analyzeTest }) => {
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <Typography variant="body1" className={classes.typoTitle} gutterBottom>
                Test has been completed.
            </Typography>

            <div style={{ width: '100%' }}>
                <Button className={classes.secondaryButton} fullWidth style={{ marginBottom: 0 }} onClick={() => history.push(`/results/${test.id}`)}>
                    Show Result
                </Button>
                <Button className={classes.secondaryButton} fullWidth style={{ marginBottom: 0 }} onClick={() => analyzeTest(test)}>
                    Analyze
                </Button>
                <Button className={classes.button} fullWidth onClick={() => initTest(test)}>
                    Restart
                </Button>
            </div>

        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        initTest: test => dispatch(initTest(test)),
        analyzeTest: test => dispatch(analyzeTest(test)),
    }
}
export default connect(null, mapDispatchToProps)(withRouter(TestComplete))

TestComplete.propTypes = {
    test: PropTypes.object.isRequired
}