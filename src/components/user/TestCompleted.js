import React, { useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { analyzeTest } from '../../store/actions/testActions'

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: 250,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}))
const TestCompleted = ({ analyzeTest, test }) => {
    const classes = useStyles();

    useEffect(() => {
        analyzeTest(test)
    }, [])
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

const mapDispatchToProps = dispatch => {
    return {
        analyzeTest: test => dispatch(analyzeTest(test))
    }
}
export default connect(null, mapDispatchToProps)(TestCompleted)
