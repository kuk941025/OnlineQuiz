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
                current_order: 0,
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