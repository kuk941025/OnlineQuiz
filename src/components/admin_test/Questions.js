import React, { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import TextField from '@material-ui/core/TextField'
import UtilList from '../util/UtilList'
import Typograhpy from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { button } from '../css/Styles'

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
}))
const Questions = () => {
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
                    type="number"
                />

                <div className={classes.addRoot}>
                    <Button variant="outlined" color="primary">
                        Add
                    </Button>
                </div>

                <Typograhpy variant="body1">
                    Selection List
                </Typograhpy>

                <UtilList data={selectList} />

            </div>
            
            <Button variant="text" className={classes.button} fullWidth>
                Add Question
            </Button>
        </div>
    )
}

export default Questions
