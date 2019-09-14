import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { progress_root } from '../css/Styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux'
import { getAvailableTests } from '../../store/actions/userActions'
import moment from 'moment'
import UtilList from '../util/UtilList'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router-dom'
import Blue from '@material-ui/core/colors/blue'
const useStyles = makeStyles(theme => ({
    progress_root,
    list: {
        border: `1px solid #eee`,
        height: 250,
        overflowY: 'auto'
    },
    typoName: {
        marginTop: theme.spacing(1) / 2,
        fontWeight: 600,
        color: Blue['A200']
    }
}))

const JoinTest = ({ getAvailableTests, tests, history, user }) => {
    const classes = useStyles();
    const [testData, setData] = useState(null);

    useEffect(() => {
        getAvailableTests();
    }, [getAvailableTests]);

    useEffect(() => {
        if (tests) {
            let list = tests.map(test => ({
                title: `${test.name}`,
                subtitle: moment(test.created_at.toDate()).calendar(),
                id: test.id
            }));
            setData(list);
        }
    }, [tests])

    const handleClick = (id) => {
        history.push(`/test/${id}`);
    }

    console.log(history);
    return (
        <React.Fragment>
            {testData ? (
                <div>
                    {user &&
                        <Typography variant="body1" className={classes.typoName}>
                            {`${user.last_name}${user.first_name}님`}
                        </Typography>
                    }
                    <Typography variant="body1" gutterBottom>
                        {`참가하실 방을 선택해주세요.`}
                    </Typography>
                    <div className={classes.list}>
                        <UtilList data={testData} onClick={handleClick} />
                    </div>
                </div>

            ) : (
                    <div className={classes.progress_root}>
                        <CircularProgress />
                    </div>
                )
            }

        </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        getAvailableTests: () => dispatch(getAvailableTests()),
    }
}

const mapStateToProps = state => {
    return {
        tests: state.user.tests,
        user: state.auth.user
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(JoinTest))
