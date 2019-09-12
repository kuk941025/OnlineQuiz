export const getTest = () => {
    return async (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();

        firestore.doc(`temp/test`).onSnapshot(doc => {
            console.log(doc.data());
        })
    }
}