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

        let testRef = db.doc(`tests/${test_id}`);

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
                dispatch({type: 'USER_TEST_TRANSACTION_COMPLETE', test_snap});
            })
        })





    }

}

export const initUser = () => {
    return { type: 'INIT_USER_DATA' }
}