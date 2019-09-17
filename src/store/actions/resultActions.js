export const loadResults = test_id => {
    return async (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();

        let result_snap = await db.collection(`tests/${test_id}/result`).get();
        let result = [];

        for (let result_doc of result_snap.docs) {
            result.push({ id: result_doc.id, ...result_doc.data() })
        };

        result.sort((a, b) => a.id > b.id ? -1 : a.id < b.id ? 1 : 0);
        dispatch({ type: 'RESULTED_LOADED', result })
    }
}