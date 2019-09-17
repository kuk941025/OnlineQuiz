import { Server_URL } from '../../components/util/Const'
import axios from 'axios'
import moment from 'moment'

export const getTest = () => {
    return async (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();

        let test_snap = await firestore.collection('tests').get();
        let result = [];
        for (let test_doc of test_snap.docs) {
            let data = test_doc.data();
            let { created_at, ...other } = data;
            result.push({ id: test_doc.id, created_at: created_at.toDate(), ...other });
        };

        dispatch({ type: 'TESTS_LOADED', result })
    }
}

export const generateTest = test => {
    return async (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();
        const { name, limit_time, limit_num } = test;


        try {
            const created_at = new Date();
            let test_snap = await db.collection(`tests`).add({
                name,
                current_order: -1,
                exceptions: [],
                limit_time,
                limit_num,
                users_in: 0,
                question_num: 0,
                created_at,
            });

            dispatch({ type: 'GENERATE_TEST_SUCCESS', id: test_snap.id, test, created_at, });
        } catch (err) {
            dispatch({ type: 'GENERATE_TEST_ERR', err })
        }



    }
}

export const loadTest = test_id => {
    return (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();

        let test_snap = db.doc(`tests/${test_id}`).onSnapshot(doc => {

            if (doc.exists) {
                dispatch({ type: 'TEST_LOADED', result: { id: doc.id, ...doc.data() } })
            }
            else {
                dispatch({ type: 'TEST_ID_NOT_VALID' });
                test_snap();
            }
        })

    }
}

export const updateTest = (id, test) => {
    return async (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();

        const { limit_num, limit_time, ...others } = test;

        await db.doc(`tests/${id}`).update({
            ...others,
            limit_num: Number(limit_num),
            limit_time: Number(limit_time),
        });
        console.log('updated');

        dispatch({ type: 'TEST_UPDATED' })
    }
}

export const addQuestion = (test_id, question) => {
    return async (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();
        const { order } = question;

        //check if order already exist
        let question_snap = await db.collection(`tests/${test_id}/questions`).where('order', '==', order).limit(1).get();

        if (question_snap.size > 0) {
            dispatch({ type: 'ORDER_ALREADY_EXIST' });
            return;
        }
        else {
            //add question
            let doc_snap = await db.collection(`tests/${test_id}/questions`).add({
                ...question,
                is_test: Number(question.is_test),
                order: Number(question.order),
                answered: 0,
            });
            dispatch({ type: 'QUESTION_ADDED', question: { id: doc_snap.id, ...question } });
        }
    }
}

export const loadQuestions = (test_id) => {
    return async (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();

        let question_snap = await db.collection(`tests/${test_id}/questions`).orderBy('order', 'asc').get();

        let result = [];
        for (let question of question_snap.docs) {
            result.push({ id: question.id, ...question.data() })
        }

        dispatch({ type: 'QUESTIONS_LOADED', result });
    }
}

export const loadQuestion = (test_id, question_id) => {
    return async (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();
        console.log('called');
        let question_snap = await db.doc(`tests/${test_id}/questions/${question_id}`).get();

        if (question_snap.exists) {
            dispatch({ type: 'QUESTION_LOADED', result: question_snap.data() })
        }
        else {
            dispatch({ type: 'QUESTION_NOT_FOUND' });
        }
    }
}

export const removeQuestion = (test_id, question_id) => {
    return async (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();
        await db.doc(`tests/${test_id}/questions/${question_id}`).delete();

        dispatch({ type: 'QUESTION_REMOVED', question_id })
    }
}

export const editQuestion = (test_id, question_id, question) => {
    return async (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();
        await db.doc(`tests/${test_id}/questions/${question_id}`).update({
            ...question,
            is_test: Number(question.is_test),
            order: Number(question.order),
        });

        dispatch({ type: 'QUESTION_UPDATED' });
    }
}


export const updateTestState = (test_id, state) => {
    return async (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();

        await db.doc(`tests/${test_id}`).update({
            current_order: state,
        });

        dispatch({ type: 'UPDATE_TEST_STATE', state })
    }
}


export const nextQuestion = (test) => {
    return async (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();
        const state = getState();

        const { questions } = state.test;
        const { current_order } = test;

        if (current_order < 0) {
            db.doc(`tests/${test.id}`).update({
                current_order: current_order + 1,
            })
        }
        else {
            let next_idx = questions.findIndex(item => (
                item.order === current_order
            )) + 1;

            if (next_idx >= questions.length) {
                next_idx = -2;
            };

            db.doc(`tests/${test.id}`).update({
                current_order: next_idx >= 0 ? questions[next_idx].order : next_idx,
            });


            if (next_idx === 0) {
                await axios.post(`${Server_URL}/start_test`, { test_id: test.id });
            }

            // console.log(next_idx >= 0 ? questions[next_idx].order : next_idx);
        }

        dispatch({ type: 'NEXT_QUESTION' });

    }
}

export const connectToQuestion = (test_id, question_order) => {
    return async (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();
        const state = getState().test;

        if (state.question_snap) state.question_snap();

        let question_snap = db.collection(`tests/${test_id}/questions`).where('order', '==', question_order).limit(1).onSnapshot(querySnap => {
            if (querySnap.size === 1) {
                let question_doc = querySnap.docs[0];

                dispatch({ type: 'CONNECTED_TO_QUESTION', result: { id: question_doc.id, ...question_doc.data() } });
            }
        });

        dispatch({ type: 'QUESTION_SNAPSHOT', question_snap })

    }
}

export const startQuestion = (test, question_id) => {
    return async (dispatch, getState) => {

        const { id, limit_time, users_in } = test;
        await axios.post(`${Server_URL}/start_question`, {
            test_id: id,
            time_limit: limit_time,
            question_id,
            users_in
        });

        dispatch({ type: 'QUESTION_STARTED' })
    }
}

export const initTest = (test) => {
    return async (dispatch, getState) => {
        await axios.post(`${Server_URL}/reset_test`, {
            test_id: test.id,
        })

        dispatch({ type: 'TEST_INITALIZED' })
    }
}

export const analyzeTest = test => {
    return async (dispatch, getState) => {
        await axios.post(`${Server_URL}/analyze_result`, {
            test_id: test.id,
            time_at: moment(new Date()).format('YYYYMMDD_HHmmss'),
        });

        dispatch({ type: 'TEST_ANALYZED' });
    }
}