import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        border: '1px solid #eee',
        minHeight: 400
    }
}))
const UtilList = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <List>
                <ListItem button>
                    <ListItemText
                        primary="name"
                        secondary="hello"
                    />
                </ListItem>
            </List>
        </div>
    )
}

export default UtilList
