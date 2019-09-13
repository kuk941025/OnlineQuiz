import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { progress_root, button, secondaryButton } from '../css/Styles'
import { updateTest } from '../../store/actions/testActions'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Question from './Question'
import QuestionList from './QuestionList'
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
    },
    button: button(theme),
    divider: {
        margin: `${theme.spacing(1)}px 0px`
    },
    typoTitle: {
        fontWeight: 600,
    },
    secondaryButton: secondaryButton(theme)
}))

const TestPreparation = ({ test_id, test, updateTest, questions, onNext }) => {
    const classes = useStyles();
    const [testData, setTest] = useState(null);

    useEffect(() => {
        if (test) setTest(test);
    }, [test]);

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

    let is_disabled = !(questions && questions.length > 0);

    return (
        <div className={classes.root}>

            {testData &&
                <React.Fragment>
                    <Typography className={classes.typoTitle} variant="body1" gutterBottom>
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

                    <Divider className={classes.divider} />

                    <Typography className={classes.typoTitle} variant="body1" gutterBottom>
                        Add Question
                    </Typography>
                    <Question test_id={test_id} mode={0} />

                    <Divider className={classes.divider} />

                    <Typography className={classes.typoTitle} variant="body1" gutterBottom>
                        Question List
                    </Typography>
                    <QuestionList test_id={test_id} read_only={false} />

                    <Divider className={classes.divider} />

                    <Button
                        fullWidth
                        variant="text"
                        className={is_disabled ? classes.secondaryButton : classes.button}
                        disabled={is_disabled}
                        onClick={onNext}>
                        Set Test
                    </Button>
                </React.Fragment>
            }


        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        updateTest: (test_id, test) => dispatch(updateTest(test_id, test)),
    }
}

const mapStateToProps = state => {
    return {
        questions: state.test.questions,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TestPreparation)

TestPreparation.propTypes = {
    test: PropTypes.object.isRequired,
    onNext: PropTypes.func.isRequired
}