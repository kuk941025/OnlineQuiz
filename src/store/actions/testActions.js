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


export const nextQuestion = (test_id) => {
    return async (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();
        const state = getState();
        const { questions, cur_question_idx } = state.test;

        let next_idx = cur_question_idx + 1;


        if (next_idx >= questions.length) {
            //end
            next_idx = -1;
            db.doc(`tests/${test_id}`).update({
                current_order: -1,
            });

        }
        else {
            db.doc(`tests/${test_id}`).update({
                current_order: questions[next_idx].order,
            });
        }


        dispatch({ type: 'NEXT_QUESTION_IDX', next_idx });

    }
}

export const connectToQuestion = (test_id, question_order) => {
    return async (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();
        const state = getState().test;

        if (state.question_snap) state.question_snap();

        let question_snap = db.collection(`tests/${test_id}/questions`).where('order', '==', question_order).limit(1).onSnapshot(querySnap => {
            if (querySnap.size === 1) {
                dispatch({ type: 'CONNECTED_TO_QUESTION', result: querySnap.docs[0].data() });
            }
        });

        dispatch({ type: 'QUESTION_SNAPSHOT', question_snap })

    }
}