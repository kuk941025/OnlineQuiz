import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Paper from '@material-ui/core/Paper'
import TestPreparation from './TestPreparation'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
    },

}))
const AdminTestLayout = ({ match }) => {
    const classes = useStyles();
    const [state, setState] = useState(0);

    const onComplete = () => {
        setState(state + 1);
    }

    return (
        <Paper className={classes.root}>
            {state === 0 && <TestPreparation test_id={match.params.id} onComplete={onComplete} />}
        </Paper>
    )
}

export default (AdminTestLayout)
