export const getAvailableTests = () => {
    return async (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();

        let test_snap = await db.collection('tests').where('current_order', '==', 0).get();
        let result = [];

        for (let test of test_snap.docs) {
            result.push({ id: test.id, ...test.data() });
        }

        dispatch({ type: 'AVAILABLE_TESTS_LOADED', result });
    }
}

export const connectToTest = (test_id) => {
    return (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();
        const state = getState();
        console.log(state.auth)
        const { phone } = state.auth.user;

        let testRef = db.doc(`tests/${test_id}`);

        if (state.user.test_snap) state.user.test_snap();

        testRef.get().then(testDoc => {
            if (!testDoc.exists) {
                dispatch({ type: 'CONNECTION_TO_TEST_NOT_VALID' });
                return;
            };

            let test_snap = testRef.onSnapshot(doc => {
                if (doc.exists) {
                    dispatch({ type: 'CONNECTED_TO_TEST', result: doc.data() });
                }
            });


            return db.runTransaction(transaction => {
                return transaction.get(testRef).then(doc => {
                    let users_in = doc.data().users_in + 1;
                    transaction.update(testRef, { users_in });
                })
            }).then(() => {
                db.doc(`tests/${test_id}/users/${phone}`).set({
                    ...state.auth.user,
                    joined_at: new Date(),
                });
                dispatch({ type: 'USER_TEST_TRANSACTION_COMPLETE', test_snap });
            })
        })
    }

}

export const disconnectToServer = () => {
    return (dispatch, getState) => {
        const state = getState();
        if (state.user.test_snap) state.user.test_snap();

        dispatch({ type: 'DISCONNECTED_FROM_TEST' })
    }
}

export const initUser = () => {
    return { type: 'INIT_USER_DATA' }
}


export const loadQuestions = (test_id) => {
    return async (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();

        let question_snap = await db.collection(`tests/${test_id}/questions`).orderBy('order').get();

        let result = [];
        for (let question_doc of question_snap.docs) {
            result.push({ id: question_doc.id, ...question_doc.data() })
        };

        dispatch({ type: 'USER_QUESTIONS_LOADED', result })
    }
}

export const connectToQuestion = (test) => {
    return async (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();
        const state = getState();
        const { current_order, id } = test;

        if (state.user.question_snap) state.user.question_snap();

        let question_snap = db.collection(`tests/${id}/questions`).where('order', '==', current_order).limit(1).onSnapshot(snap => {

            if (snap.size === 1) {
                let doc = snap.docs[0];
                dispatch({ type: 'CONNECTED_TO_QUESTION', result: { id: doc.id, ...doc.data() } })
            }
        });

        dispatch({ type: 'USER_CONNECTION_TO_QUESTION', question_snap });
    }
}

export const submitAnswer = (test_id, question_id, answer, time) => {
    return (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();
        const auth = getState().auth;
        db.doc(`tests/${test_id}/questions/${question_id}/answers/${auth.user.phone}`).set({
            created_at: new Date(),
            answer,
            time
        });

        let questionRef = db.doc(`tests/${test_id}/questions/${question_id}`)


        db.runTransaction(transaction => {
            return transaction.get(questionRef).then(doc => {
                let answered = doc.data().answered + 1;

                transaction.update(questionRef, { answered });
            })
        })

        dispatch({ type: 'ANSWER_SUBMITED' });
    }
}

export const disconnectToQuestion = () => {
    return (dispatch, getState) => {
        const state = getState().user;

        if (state.question_snap) state.question_snap();
    }
}

export const connectToAnswer = (test_id, question_id) => {
    return (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();
        const state = getState();
        const user = state.user;
        const auth = state.auth.user;

        if (user.answer_snap) user.answer_snap();


        console.log('called');
        console.log(test_id);
        let answer_snap = db.doc(`tests/${test_id}/questions/${question_id}/answers/${auth.phone}`).onSnapshot(doc => {
            if (doc.exists) {
                let data = doc.data();
                console.log(data);
                if (data.rank) {
                    dispatch({ type: 'CONNECTED_TO_ANSWER', answer: data });
                    answer_snap();
                }
            }
        });

        dispatch({ type: 'ANSWER_SNAPSHOT', answer_snap })
    }
}

export const initAnswer = () => {
    return (dispatch, getState) => {
        const state = getState().user;

        if (state.answer_snap) state.answer_snap();
        dispatch({ type: 'INIT_ANSWER' });
    }
}