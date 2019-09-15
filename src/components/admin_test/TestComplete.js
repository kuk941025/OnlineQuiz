import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { initTest } from '../../store/actions/testActions'
import Button from '@material-ui/core/Button'
import { button } from '../css/Styles'

const useStyles = makeStyles(theme => ({
    typoTitle: {
        fontWeight: 600,
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 250,
        margin: `0px ${theme.spacing(1)}px`
    },
    button: button(theme),

}))

const TestComplete = ({ initTest, test }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="body1" className={classes.typoTitle} gutterBottom>
                Test has been completed.
            </Typography>

            <Button className={classes.button} fullWidth onClick={() => initTest(test)}>
                Restart
            </Button>
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        initTest: test => dispatch(initTest(test)),
    }
}
export default connect(null, mapDispatchToProps)(TestComplete)

TestComplete.propTypes = {
    test: PropTypes.object.isRequired
}