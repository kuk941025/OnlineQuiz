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

        let test_snap = db.doc(`tests/${test_id}`).onSnapshot(doc => {
            if (doc.exists) {
                dispatch({ type: 'CONNECTED_TO_TEST', result: doc.data() });
            }
            else {
                dispatch({ type: 'CONNECTION_TO_TEST_NOT_VALID' });
                test_snap();
            }
        })
    }

}

export const initUser = () => {
    return { type: 'INIT_USER_DATA' }
}