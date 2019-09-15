import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import Grey from '@material-ui/core/colors/grey'
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Downshift from 'downshift'
import deburr from 'lodash/deburr'

const useStyles = makeStyles(theme => ({
    textField: {
        marginTop: `${theme.spacing(1)}px`
    },
    formControl: {
        padding: theme.spacing(1),
        border: `1px solid ${Grey['200']}`,
        overflowY: 'auto',
        height: `calc(100% - 128px)`,
        marginTop: theme.spacing(1),
    },
    root: {
        flexGrow: 1,
        height: 250,
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    chip: {
        margin: theme.spacing(0.5, 0.25),
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    inputInput: {
        width: 'auto',
        flexGrow: 1,
    },
    divider: {
        height: theme.spacing(2),
    },
}))

const AnswerPicker = ({ selections, disabled, onChange, onAuto, onSubmit }) => {
    const classes = useStyles();
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        let list = [];
        selections.forEach(selection => {
            list.push({ label: selection.title });
            list.push({ label: selection.subtitle })

        })

        list.sort((a, b) => (a.label > b.label ? 1 : a.label < b.label ? -1 : 0));
        setSuggestions(list);

    }, [selections]);

    const handleChange = input => {
        onAuto(input)
    }

    const renderInput = inputProps => {
        const { InputProps, classes, ref, ...other } = inputProps;

        return (
            <TextField
                className={classes.textField}
                disabled={disabled}
                InputProps={{
                    inputRef: ref,
                    classes: {
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    },
                    ...InputProps,
                }}
                {...other}
            />
        );
    }

    const renderSuggestion = suggestionProps => {
        const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
        const isHighlighted = highlightedIndex === index;
        const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

        return (
            <MenuItem
                {...itemProps}
                key={suggestion.label}
                selected={isHighlighted}
                component="div"
                style={{
                    fontWeight: isSelected ? 500 : 400,
                }}
            >
                {suggestion.label}
            </MenuItem>
        );
    }

    const getSuggestions = (value, { showEmpty = false } = {}) => {
        const inputValue = deburr(value.trim()).toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;

        return inputLength === 0 && !showEmpty
            ? []
            : suggestions.filter(suggestion => {
                const keep =
                    count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

                if (keep) {
                    count += 1;
                }

                return keep;
            });
    }


    return (
        <React.Fragment>
            <form onSubmit={onSubmit}>


                <Downshift>
                    {({
                        getInputProps,
                        getItemProps,
                        getLabelProps,
                        getMenuProps,
                        highlightedIndex,
                        inputValue,
                        isOpen,
                        selectedItem,
                    }) => {
                        const { onBlur, onFocus, ...inputProps } = getInputProps({
                            placeholder: '이름을 입력해주세요. (성없이도 가능)',
                        });
                        handleChange(inputValue);

                        return (
                            <div className={classes.container}>
                                {renderInput({
                                    fullWidth: true,
                                    classes,
                                    label: '정답입력',
                                    InputLabelProps: getLabelProps({ shrink: true }),
                                    InputProps: { onBlur, onFocus },
                                    inputProps,
                                })}

                                <div {...getMenuProps()}>
                                    {isOpen ? (
                                        <Paper className={classes.paper} square>
                                            {getSuggestions(inputValue).map((suggestion, index) =>
                                                renderSuggestion({
                                                    suggestion,
                                                    index,
                                                    itemProps: getItemProps({ item: suggestion.label }),
                                                    highlightedIndex,
                                                    selectedItem,
                                                }),
                                            )}
                                        </Paper>
                                    ) : null}
                                </div>
                            </div>
                        );

                    }}
                </Downshift>
            </form>

            <div className={classes.formControl}>
                <FormControl component="fieldset" >
                    <RadioGroup name="selections">
                        {selections.map((item, idx) => (
                            <FormControlLabel
                                key={idx}
                                disabled={disabled}
                                control={<Radio />}
                                value={item.title}
                                label={item.title}
                                onChange={onChange}
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
    selections: PropTypes.array.isRequired,
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
}