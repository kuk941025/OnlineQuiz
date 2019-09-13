import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import uuid from 'uuid/v1'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        border: '1px solid #eee',
        minHeight: 250
    }
}))
const UtilList = ({ data, onClick }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List>
                {data && data.map(item => (
                    <ListItem key={uuid()} button onClick={onClick ? () => onClick(item.id) : null}>
                        <ListItemText
                            primary={item.title}
                            secondary={item.subtitle}
                        />
                    </ListItem>
                ))}

            </List>
        </div>
    )
}

export default UtilList

UtilList.propTypes = {
    data: PropTypes.array,
    onClick: PropTypes.func,
}