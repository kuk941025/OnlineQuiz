import React, { useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { getTest } from '../../store/actions/testActions'
import { connect } from 'react-redux'

const AdminLayout = ({ getTest }) => {
    useEffect(() => {
        getTest();
    })
    return (
        <Container maxWidth="md">
            <Typography variant="body1" >
                hello
            </Typography>
            <CircularProgress />
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
