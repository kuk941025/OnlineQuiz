import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
const useStyles = makeStyles(theme => ({
    root: {
        minHeight: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }
}))
const TestReady = ({test}) => {
    const classes = useStyles();
    console.log(test);
    return (
        <div>
            <div className={classes.root}>
                <Typography variant="body1">
                    Waiting for users...
                </Typography>
                <Typography variant="body1">
                    {`Current users: ${test.users_in}`}
                </Typography>
            </div>

        </div>
    )
}

export default TestReady

TestReady.propTypes = {
    test: PropTypes.object.isRequired,

}