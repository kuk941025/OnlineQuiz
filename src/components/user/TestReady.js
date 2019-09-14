import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
        minHeight: 250,
    },
    flexRoot: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));


const TestReady = ({ test }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="body1" gutterBottom style={{ fontWeight: 600 }}>
                시작 대기중...
            </Typography>
            <div className={classes.flexRoot}>
                <Typography variant="body1" >
                    참여 인원:
                </Typography>
                <Typography variant="body1" color="primary">
                    {test.users_in}
                </Typography>
            </div>
        </div>
    )
}

export default TestReady

TestReady.propTypes = {
    test: PropTypes.object.isRequired
}