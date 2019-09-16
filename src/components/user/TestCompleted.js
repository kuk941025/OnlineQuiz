import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: 250,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}))
const TestCompleted = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div>
                <Typography variant="body1" align="center">
                    완료
                </Typography>
            </div>

        </div>
    )
}

export default TestCompleted
