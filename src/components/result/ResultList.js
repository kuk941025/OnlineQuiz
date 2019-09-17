import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'
import UtilList from '../util/UtilList'
import Typography from '@material-ui/core/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { progress_root } from '../css/Styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { loadResults } from '../../store/actions/resultActions'
import moment from 'moment'
import Paper from '@material-ui/core/Paper'
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
    },
    progress_root,
    rootList: {
        maxHeight: 400,
        overflowY: 'auto'
    }
}))
const ResultList = ({ match, history }) => {
    const dispatch = useDispatch();
    const results = useSelector(state => state.result.results);
    const classes = useStyles()

    const [resultList, setList] = useState(null);

    useEffect(() => {
        dispatch(loadResults(match.params.test_id));
    }, [dispatch]);

    useEffect(() => {

        if (results) {

            if (results.length > 0) {
                let list = results.map(result => ({
                    title: `${result.ranks ? result.ranks.length : '0'}명이 참여함.`,
                    subtitle: moment(result.id, 'YYYYMMDD_HHmmss').calendar(),
                    id: result.id,
                }));
                setList(list);
            }
            else setList([])

        }

    }, [results]);

    return (
        <Container maxWidth="sm">
            <Paper className={classes.root}>
                {!resultList &&
                    <div className={classes.progress_root}>
                        <CircularProgress />
                    </div>
                }
                {resultList &&
                    <div>
                        <Typography variant="body1" gutterBottom align="center">
                            Select a result to view. 
                        </Typography>
                        <div className={classes.rootList}>
                            <UtilList data={resultList} onClick={id => history.push(`/results/${match.params.test_id}/${id}`)}/>
                        </div>
                    </div>

                }
            </Paper>

        </Container>
    )
}

export default ResultList
