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