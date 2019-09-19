import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import ResultChart from './ResultChart'

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '90vh',
        padding: theme.spacing(1),
    },
    typoTitle: {
        fontWeight: 600,
        marginTop: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
    },
    titleRoot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    divider: {
        margin: `${theme.spacing(1)}px 0px`
    },
    questionRoot: {
        border: `1px solid #eee`,
        padding: theme.spacing(1),
    },
    gridChartRoot: {
        marginTop: theme.spacing(1)
    }
}))
const Result = ({ match }) => {
    const classes = useStyles();
    const [resultData, setResult] = useState(null);
    const [err, setErr] = useState(false);
    const [curQuestion, setCurQuestion] = useState(null);
    const [selectionData, setSelectionData] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [overallData, setOverallData] = useState(null);

    const results = useSelector(state => state.result.results);

    useEffect(() => {
        let { result_id } = match.params;
        let result = results.find(result => result.id === result_id);

        if (!result) setErr(true)
        else {
            console.log(result);
            setCurQuestion(result.questions[0]);
            setResult(result);
        }
    }, []);


    useEffect(() => {
        if (curQuestion) {
            if (curQuestion.id === 'FINAL') {
                setResponseData(null);
                setSelectionData(null);

                let data = [];
                for (let rank of resultData.ranks) {
                    let item = {
                        name: rank.last_name + rank.first_name,
                        score: rank.score, 
                    };
                    data.push(item);
                }

                setOverallData({
                    keys: ['score'],
                    data, 
                })
            }
            else {
                setOverallData(null);
                let data = [];
                for (let answer of curQuestion.answers) {
                    let item = {
                        name: answer.last_name + answer.first_name,
                        response_time: answer.time === Infinity ? 0 : answer.time,
                    };
                    data.push(item);
                }

                setResponseData({
                    keys: ['response_time'],
                    data,
                });

                let selectData = [];
                for (let select of curQuestion.selected) {
                    let item = {
                        choice: select.choice === 'NONE' ? '시간초과' : select.choice,
                        cnt: select.cnt
                    };

                    selectData.push(item);
                };

                setSelectionData({
                    keys: ['cnt'],
                    data: selectData,
                })
            }

        }
    }, [curQuestion])



    const handleChangeQuestion = e => {
        if (e.target.value === 'FINAL') {
            setCurQuestion({
                id: 'FINAL',
                title: '',
                content: '',
            })
            return;
        }
        let targetQuestion = resultData.questions.find(question => question.id === e.target.value);

        setCurQuestion(targetQuestion);
    }




    if (results.length === 0 || err) return <Redirect to={`/results/${match.params.test_id}`} />
    if (!resultData) return null;

    return (
        <Container maxWidth="xl">
            <Paper className={classes.root}>


                <Typography variant="h6" className={classes.typoTitle} align="center">
                    결과
                    </Typography>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <FormControl className={classes.formControl} >
                        <InputLabel >질문</InputLabel>
                        <Select
                            value={curQuestion.id}
                            onChange={handleChangeQuestion}
                        >
                            {resultData.questions.map((question, idx) => (
                                <MenuItem key={question.id} value={question.id}>{`${idx}. ${question.title}`}</MenuItem>
                            ))}
                            <MenuItem value="FINAL">최종결과</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <Divider className={classes.divider} />
                <Grid container justify="center">
                    <Grid item md={6} className={classes.questionRoot}>
                        <Typography variant="body1" gutterBottom style={{ fontWeight: 600 }} align="center">
                            {curQuestion.title}
                        </Typography>
                        <Typography variant="body1">
                            {curQuestion.content}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container className={classes.gridChartRoot} spacing={2}>
                    <Grid item md={12} >
                        <ResultChart color="nivo" x_axis="횟수" y_axis="" data={selectionData} indexBy="choice" />
                    </Grid>
                    <Grid item md={12} >
                        <ResultChart color="category10" x_axis="반응시간" y_axis="이름" data={responseData} indexBy="name" />
                    </Grid>
                    <Grid item md={12}>
                        <ResultChart color="category10" x_axis="점수" y_axis="이름" data={overallData} indexBy="name"/>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default Result
