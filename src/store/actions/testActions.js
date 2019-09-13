export const getTest = () => {
    return async (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();

        firestore.doc(`temp/test`).onSnapshot(doc => {
            console.log(doc.data());
        })
    }
}

export const generateTest = test => {
    return async (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();
        const { test_name, limit_time, limit_num } = test;


        try {
            const created_at = new Date();
            let test_snap = await db.collection(`tests`).add({
                name: test_name,
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