import React, { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import LockIcon from '@material-ui/icons/Lock'
import Paper from '@material-ui/core/Paper'
import Blue from '@material-ui/core/colors/blue'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { button } from '../css/Styles'
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
        minHeight: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        height: 42,
        width: 42,
        color: Blue['200']
    },
    textField: {
        width: '100%',
        minWidth: 150,
    },
    button: button(theme),
    innerRoot: {
        width: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }
}))
const UserAuth = () => {
    const classes = useStyles();
    const [phone, setPhone] = useState('');

    const handleChange = e => {
        setPhone(e.target.value);
    }
    return (
        <Paper className={classes.root}>
            <div className={classes.innerRoot}>
                <LockIcon className={classes.icon} />
                <TextField
                    id="phone_num"
                    label="핸드폰 번호"
                    margin="normal"
                    placeholder="-없이 입력"
                    className={classes.textField}
                    type="number"
                    value={phone}
                    onChange={handleChange}
                />

                <Button variant="text" className={classes.button} fullWidth>
                    로그인
                </Button>
            </div>
        </Paper>
    )
}

export default UserAuth
