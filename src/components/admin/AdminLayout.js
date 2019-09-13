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
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment'
import { progress_root } from '../css/Styles'
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
    },
    titleRoot: {
        display: 'flex',
        alignItems: 'center',
        margin: `${theme.spacing(1)}px 0px`
    },
    progressRoot: progress_root, 
}))

const AdminLayout = ({ getTest, tests, history }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null);


    useEffect(() => {
        //if data is not initialized, request for data.
        if (!tests) {
            getTest();
        }
        else {
            console.log(tests);
            let test_data = tests.map(test => ({
                id: test.id,
                title: test.name,
                subtitle: moment(test.created_at).calendar(),
            }));

            setData(test_data);
        }
    }, [getTest, tests])

    const handleClose = () => {
        setOpen(false);
    }

    const onMakeTest = () => {
        setOpen(true);
    }

    const onTestClick = (id) => {
        history.push(`admin/test/${id}`);
    }

    return (
        <React.Fragment>
            <Paper className={classes.root}>
                <div className={classes.titleRoot}>
                    <Typography variant="h6">
                        Current Tests
                    </Typography>
                    <Button style={{ marginLeft: 'auto' }} variant="outlined" onClick={onMakeTest}>
                        Make Test
                    </Button>
                </div>

                {tests ? (
                    <UtilList data={data} onClick={onTestClick}/>
                ) : (
                        <div className={classes.progressRoot}>
                            <CircularProgress />
                        </div>
                    )}

            </Paper>

            <MakeTest
                open={open}
                onClose={handleClose}
                setData={setData}
            />
        </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        getTest: () => dispatch(getTest()),
    }
}
const mapStateToProps = state => {
    console.log(state.test);
    return {
        tests: state.test.tests,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout)
