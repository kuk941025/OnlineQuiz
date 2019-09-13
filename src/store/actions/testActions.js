import { async } from "q";

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


        // let test_snap = await db.doc(`tests/${test_id}`).get();
        let test_snap = db.doc(`tests/${test_id}`).onSnapshot(doc => {
            console.log('dispatched')
            if (doc.exists){
                dispatch({ type: 'TEST_LOADED', result: doc.data() })
            }
            else {
                dispatch({type: 'TEST_ID_NOT_VALID'});
                test_snap();
            }
        })
        // if (test_snap.exists) {

        // }
        // else {
        //     dispatch({ type: 'TEST_ID_NOT_VALID' })
        // }
    }
}

export const updateTest = (id, test) => {
    return async (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();

        await db.doc(`tests/${id}`).update({
            ...test,
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
            db.collection(`tests/${test_id}/questions`).add(question);
            dispatch({ type: 'QUESTION_ADDED', question });
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
        console.log(result);
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
        await db.doc(`tests/${test_id}/questions/${question_id}`).update(question);

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