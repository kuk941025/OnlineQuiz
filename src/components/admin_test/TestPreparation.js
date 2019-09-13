import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { progress_root } from '../css/Styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { loadTest } from '../../store/actions/testActions'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
const useStyles = makeStyles(theme => ({
    progress_root,
    root: {
        minHeight: 250,
    },
    flexRoot: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    textField: {
        width: '45%',
        minWidth: 150, 
    }
}))

const TestPreparation = ({ test_id, loadTest, test, test_result }) => {
    const classes = useStyles();
    const [msg, setMsg] = useState('');

    useEffect(() => {
        loadTest(test_id);
    }, [loadTest]);

    useEffect(() => {
        if (test_result !== '') {
            if (test_result.startsWith('SUCCESS')) {
                console.log(test);
            }
            else {
                setMsg('Not a valid test id.');
            }
        }

    }, [test, test_result])
    return (
        <div className={classes.root}>
            {!test && <div className={classes.progress_root}><CircularProgress /></div>}
            {msg !== '' && <Typography variant="body1" color="error" align="center">{msg}</Typography>}

            {test && msg === '' &&
                <React.Fragment>
                    <Typography variant="body1" gutterBottom>
                        Test Information
                    </Typography>
                    <div className={classes.flexRoot}>
                        <TextField
                            id="name"
                            label="Test name"
                            margin="normal"
                            value={test.name}
                            fullWidth
                        />

                        <TextField
                            id="limit_time"
                            value={test.limit_time}
                            label="Time limit"
                            margin="normal"
                            className={classes.textField}
                        />


                        <TextField
                            id="limit_num"
                            value={test.limit_num}
                            label="Concurrency Limit"
                            margin="normal"
                            className={classes.textField}
                        />
                    </div>
                    <Button fullWidth variant="text" color="primary">
                        Save
                    </Button>

                    <Divider />
                </React.Fragment>
            }

        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        loadTest: (test_id) => dispatch(loadTest(test_id)),
    }
}
const mapStateToProps = state => {
    const { selected_test, selected_test_result } = state.test;

    return {
        test: selected_test,
        test_result: selected_test_result,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestPreparation)
