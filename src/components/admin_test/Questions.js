import React, { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import UtilList from '../util/UtilList'
import Typograhpy from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { button } from '../css/Styles'
import { Temp_Selection } from '../util/Const'
import { addQuestion } from '../../store/actions/testActions'
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
    inputRoot: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    addRoot: {
        width: '100%',
        padding: `${theme.spacing(1)}px 0px`,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    smallField: {
        width: '45%',
        minWidth: 150,
    },
    button: button(theme),
    list: {
        maxHeight: 250,
        overflowY: 'auto',
        width: '100%'
    }
}))
const Questions = ({ test_id, addQuestion }) => {
    const classes = useStyles();

    const [question, setQuestion] = useState({
        title: '',
        content: '',
        selections: [],
        is_test: 0,
        order: 0,
        state: 0,
    })
    const [selection, setSelection] = useState('');
    const [selectList, setList] = useState([]);
    const handleChange = e => {
        setQuestion({
            ...question,
            [e.target.id]: e.target.value,
        })
    }

    const handleSelection = e => {
        setSelection(e.target.value);
    }

    const addSelection = () => {
        if (selection === '') alert('Please fill selection query.');
        else {
            try {
                let splited = selection.split(',');
                let list = [];

                let idx = 0;
                for (let query of splited) {
                    let names = query.split('/');
                    list.push({ title: names[0], subtitle: names[1] });
                };

                setList(list);
                setQuestion({
                    ...question,
                    selections: list,
                })
                setSelection('');
            } catch (err) {
                setList([]);
            }

        }
    }

    const onSubmit = () => {
        let is_validate = true;
        Object.keys(question).forEach(key => {
            if (key === 'selections' && question[key].length === 0) is_validate = false;
            else {
                if (question[key] === '') is_validate = false;
            }

            if (!is_validate) console.log(key);
        });

        if (is_validate && question['is_test'] >= 0 && question['is_test'] <= 1) {
            addQuestion(test_id, question);
        }
        else {
            console.log(question);
            alert("Please recheck the form.")
        }

    }

    const { title, content, is_test, order } = question;
    return (
        <div>
            <div className={classes.inputRoot}>
                <TextField
                    id="title"
                    label="Title"
                    value={title}
                    margin="normal"
                    fullWidth
                    onChange={handleChange}
                />

                <TextField
                    id="content"
                    label="Content"
                    value={content}
                    margin="normal"
                    fullWidth
                    onChange={handleChange}
                />

                <TextField
                    id="is_test"
                    label="Question Type"
                    value={is_test}
                    margin="normal"
                    className={classes.smallField}
                    onChange={handleChange}
                />

                <TextField
                    id="order"
                    label="Order"
                    value={order}
                    margin="normal"
                    className={classes.smallField}
                    onChange={handleChange}
                />


                <TextField
                    id="selection"
                    label="Selection Query (Answer/Subanswer)"
                    value={selection}
                    margin="normal"
                    fullWidth
                    onChange={handleSelection}
                />

                <div className={classes.addRoot}>
                    <Button variant="outlined" style={{ marginRight: 8 }} onClick={() => setSelection(Temp_Selection)}>
                        Set with temp data
                    </Button>
                    <Button variant="outlined" color="primary" onClick={addSelection}>
                        Add
                    </Button>
                </div>

                <Typograhpy variant="body1">
                    Selection List
                </Typograhpy>

                <div className={classes.list}>
                    <UtilList data={selectList} />
                </div>


            </div>

            <Button variant="text" className={classes.button} fullWidth onClick={onSubmit}>
                Add Question
            </Button>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addQuestion: (test_id, question) => dispatch(addQuestion(test_id, question)),
    }
}


export default connect(null, mapDispatchToProps)(Questions)

Questions.propTypes = {
    test_id: PropTypes.string.isRequired,
}