import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Paper from '@material-ui/core/Paper'
import TestPreparation from './TestPreparation'
import { progress_root } from '../css/Styles';
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux'
import { loadTest } from '../../store/actions/testActions'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
        minHeight: 250,
    },
    progress_root,
}))
const AdminTestLayout = ({ match, loadTest, test_result, test, test_order }) => {
    const classes = useStyles();
    const [testOrder, setTestOrder] = useState(0);
    const [loading, setLoading] = useState(true);
    const [testData, setTest] = useState(null);
    const [msg, setMsg] = useState('');

    const test_id = match.params.id;

    useEffect(() => {
        loadTest(test_id);
    }, [loadTest, test_id])

    useEffect(() => {
        if (test_result !== '') {
            if (test_result.startsWith('SUCCESS')) {
                setTest(test);
            }
            else if (test_result.startsWith('FAIL')) {
                setMsg("Not a valid test id");
            }

            setLoading(false);
        }
    }, [test, test_result])

    useEffect(() => {
        setTestOrder(test_order)
    }, [test_order])

    const handleNext = () => {
        setTestOrder(testOrder + 1);
    }


    return (
        <Paper className={classes.root}>
            {!loading ? (
                <React.Fragment>
                    <Typography variant="body1" color="secondary">
                        {msg}
                    </Typography>

                    {testOrder === -1 && <TestPreparation test={testData} test_id={test_id} onNext={handleNext} />}
                </React.Fragment>
            ) : (
                    <div className={classes.progress_root}>
                        <CircularProgress />
                    </div>
                )}
        </Paper>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        loadTest: (test_id) => dispatch(loadTest(test_id)),
    }
}

const mapStateToProps = state => {
    const { selected_test, selected_test_result, test_order } = state.test;

    return {
        test: selected_test,
        test_result: selected_test_result,
        test_order
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminTestLayout)
