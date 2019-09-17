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
                        <Typography variant="body1" gutterBottom style={{fontWeight: 600}} align="center">
                            {curQuestion.title}
                        </Typography>
                        <Typography variant="body1">    
                            {curQuestion.content}
                        </Typography>
                    </Grid>
                </Grid>
                
                <Grid container className={classes.gridChartRoot} spacing={2}>
                    <Grid item md={6} >
                        asd
                    </Grid>
                    <Grid item md={6} >
                        asd
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default Result
