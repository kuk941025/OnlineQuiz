import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import Grey from '@material-ui/core/colors/grey'

const useStyles = makeStyles(theme => ({
    textField: {
        margin: `${theme.spacing(1)}px 0px`
    },
    formControl: {
        padding: theme.spacing(1),
        border: `1px solid ${Grey['200']}`,
        overflowY: 'auto',
        height: `calc(100% - 128px)`
    }
}))

const AnswerPicker = ({ selections }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <TextField
                fullWidth
                label="정답 입력"
                variant="outlined"
                placeholder="이름을 입력해주세요.(성없이도 가능)"
                className={classes.textField}
            />

            <div className={classes.formControl}>
                <FormControl component="fieldset" >
                    <RadioGroup name="selections">
                        {selections.map((item, idx) => (
                            <FormControlLabel
                                key={idx}
                                control={<Radio />}
                                value={item.title}
                                label={item.title}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </div>

        </React.Fragment>
    )
}

export default AnswerPicker

AnswerPicker.propTypes = {
    selections: PropTypes.array.isRequired
}