import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { getTest } from '../../store/actions/testActions'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import UtilList from '../util/UtilList'
import MakeTest from './MakeTest'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
    },
    titleRoot: {
        display: 'flex',
        alignItems: 'center',
        margin: `${theme.spacing(1)}px 0px`
    }
}))

const AdminLayout = ({ getTest }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const onMakeTest = () => {
        setOpen(true);
    }

    useEffect(() => {
        getTest();
    })
    return (
        <Container maxWidth="md">
            <Paper className={classes.root}>
                <div className={classes.titleRoot}>
                    <Typography variant="h6">
                        Current Tests
                    </Typography>
                    <Button style={{marginLeft: 'auto'}} variant="outlined" onClick={onMakeTest}>
                        Make Test
                    </Button>
                </div>

                <UtilList />
            </Paper>

            <MakeTest 
                open={open}
                onClose={handleClose}
            />
        </Container>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        getTest: () => dispatch(getTest()),
    }
}
const mapStateToProps = state => {
    console.log(state);
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout)
