import React, { useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { getTest } from '../../store/actions/testActions'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import UtilList from '../util/UtilList'

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

    useEffect(() => {
        getTest();
    })
    return (
        <Container maxWidth="md">
            <Paper className={classes.root}>
                <div className={classes.titleRoot}>
                    <Typography variant="body1" >
                        Current Tests
                    </Typography>
                    <Button style={{marginLeft: 'auto'}} variant="outlined">
                        Make Test
                    </Button>
                </div>

                <UtilList />
            </Paper>

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
