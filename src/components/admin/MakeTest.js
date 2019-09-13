import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { generateTest } from '../../store/actions/testActions'

const useStyles = makeStyles(theme => ({
    input: {
        margin: `${theme.spacing(1)}px 0px`,
    },
    flexRoot: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    smallInput: {
        width: '45%',
        minWidth: 150
    }

}));

const initTest = {
    name: '',
    limit_time: '',
    limit_num: ''
}

const MakeTest = ({ open, onClose, generateTest, setData }) => {
    const classes = useStyles();
    const [test, setTest] = useState(initTest);

    let { name, limit_time, limit_num } = test;


    useEffect(() => {
        if (open === false) {
            setTest(initTest);
        }
    }, [open]);

    const onChange = e => {
        setTest({
            ...test,
            [e.target.id]: e.target.value,
        })
    };

    const onConfirm = () => {
        let is_validate = true;
        Object.keys(test).forEach(key => {
            if (test[key] === '') is_validate = false;
        });

        if (is_validate) {
            generateTest(test);
            onClose();
        }
        else {
            alert('Please fill the forms');
        }

    };


    return (
        <Dialog
            onClose={onClose}
            open={open}
        >
            <DialogTitle>Generate Test</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter neceesary information for generating a new test.
                </DialogContentText>
                <Input
                    id="name"
                    onChange={onChange}
                    value={name}
                    placeholder="Test name"
                    className={classes.input}
                    fullWidth
                />
                <div className={classes.flexRoot}>
                    <Input
                        id="limit_time"
                        onChange={onChange}
                        value={limit_time}
                        placeholder="Time Limit"
                        className={classNames(classes.input, classes.smallInput)}
                        type="number"
                    />
                    <Input
                        id="limit_num"
                        onChange={onChange}
                        value={limit_num}
                        placeholder="Time Limit"
                        className={classNames(classes.input, classes.smallInput)}
                        type="number"
                    />

                </div>

            </DialogContent>
            <DialogActions>
                <Button variant="text" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="text" color="primary" onClick={onConfirm}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        generateTest: (test) => dispatch(generateTest(test)),
    }
}

export default connect(null, mapDispatchToProps)(MakeTest)

MakeTest.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}