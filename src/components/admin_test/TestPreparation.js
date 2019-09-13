import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { progress_root, button } from '../css/Styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { loadTest, updateTest } from '../../store/actions/testActions'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Questions from './Questions'

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
    },
    button: button(theme),

}))

const TestPreparation = ({ test_id, loadTest, test, test_result, updateTest }) => {
    const classes = useStyles();
    const [msg, setMsg] = useState('');
    const [testData, setTest] = useState(null);

    useEffect(() => {
        loadTest(test_id);
    }, [loadTest]);

    useEffect(() => {
        if (test_result !== '') {
            if (test_result.startsWith('SUCCESS')) {
                setTest(test);
            }
            else {
                setMsg('Not a valid test id.');
            }
        }

    }, [test, test_result])

    const handleChange = e => {
        setTest({
            ...testData,
            [e.target.id]: e.target.value,
        })
    };

    const handleUpdate = () => {
        let is_validate = true;
        Object.keys(testData).forEach(key => {
            if (testData[key] === '') is_validate = false;
        });

        if (is_validate) updateTest(test_id, testData);
        else alert('Please fill all the blanks');
    }

    return (
        <div className={classes.root}>
            {!testData && <div className={classes.progress_root}><CircularProgress /></div>}
            {msg !== '' && <Typography variant="body1" color="error" align="center">{msg}</Typography>}

            {testData && msg === '' &&
                <React.Fragment>
                    <Typography variant="body1" gutterBottom>
                        Test Information
                    </Typography>
                    <div className={classes.flexRoot}>
                        <TextField
                            id="name"
                            label="Test name"
                            margin="normal"
                            value={testData.name}
                            fullWidth
                            onChange={handleChange}
                        />

                        <TextField
                            type="number"
                            id="limit_time"
                            value={testData.limit_time}
                            label="Time limit"
                            margin="normal"
                            className={classes.textField}
                            onChange={handleChange}
                        />


                        <TextField
                            type="number"
                            id="limit_num"
                            value={testData.limit_num}
                            label="Concurrency Limit"
                            margin="normal"
                            className={classes.textField}
                            onChange={handleChange}
                        />
                    </div>
                    <Button fullWidth variant="text" className={classes.button} onClick={handleUpdate}>
                        Save
                    </Button>

                    <Questions />
                </React.Fragment>
            }

        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        loadTest: (test_id) => dispatch(loadTest(test_id)),
        updateTest: (test_id, test) => dispatch(updateTest(test_id, test)),
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
