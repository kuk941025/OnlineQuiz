import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import uuid from 'uuid/v1'


const UtilList = ({ data, onClick }) => {
    return (

        <List >
            {data && data.map(item => (
                <ListItem key={uuid()} button onClick={onClick ? () => onClick(item.id) : null}>
                    <ListItemText
                        primary={item.title}
                        secondary={item.subtitle}
                    />
                </ListItem>
            ))}

        </List>

    )
}

export default UtilList

UtilList.propTypes = {
    data: PropTypes.array,
    onClick: PropTypes.func,
}