import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { seeResult } from '../../store/actions/testActions'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
    divider: {
        margin: `${theme.spacing(1)}px 0px`
    }
}))
const ImmediateResult = ({ match }) => {
    const dispatch = useDispatch();
    const answers = useSelector(state => state.test.answers);
    const classes = useStyles();
    const [responseData, setResponseData] = useState([]);
    const [answerData, setAnswerData] = useState([]);

    useEffect(() => {
        const { test_id, question_id } = match.params;

        dispatch(seeResult(test_id, question_id));
    }, []);

    useEffect(() => {
        if (answers) {
            let resp = [];
            let selections = [];
            answers.forEach((answer, idx) => {
                resp.push(`${idx + 1}위. ${answer.last_name}${answer.first_name} ${answer.time / 1000}초`);

                let selectIdx = selections.findIndex(selection => selection.answer === answer.answer)
                if (selectIdx < 0) {
                    selections.push({
                        answer: answer.answer,
                        cnt: 1,
                        names: [`${answer.last_name}${answer.first_name}`],
                    });
                }
                else {
                    selections[selectIdx] = {
                        ...selections[selectIdx],
                        cnt: selections[selectIdx].cnt + 1,
                        names: selections[selectIdx].names.concat([`${answer.last_name}${answer.first_name}`])
                    }
                }
            });

            selections.sort((a, b) => a.cnt > b.cnt ? 1 : a.cnt < b.cnt ? - 1 : 0);
  
            let selectResult = [];
            selections.forEach((select, idx) => {
                let names = '';
                let nameIdx = 0;
                for (let name of select.names) {
                    if (nameIdx === 0) names = name;
                    else names = `${names}, ${name}`;
                    nameIdx++;

                }
                selectResult.push(`${idx + 1}위. ${select.answer} ${select.cnt}표 (${names})`)
            });

            setResponseData(resp);
            setAnswerData(selectResult);
        }
    }, [answers])

    return (
        <div>
            <Typography variant="body1" align="center">
                선택답
            </Typography>
            {answerData && answerData.map((answer, idx) => (
                <Typography variant="body1" key={idx}>
                    {answer}
                </Typography>
            ))}

            <Divider className={classes.divider} />

            <Typography variant="body1" align="center">
                반응
            </Typography>
            {responseData && responseData.map((response, idx) => (
                <Typography variant="body1" key={idx}>
                    {response}
                </Typography>
            ))}
        </div>
    )
}

export default ImmediateResult
