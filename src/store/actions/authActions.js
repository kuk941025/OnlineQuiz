export const signIn = (phone) => {
    return async (dispatch, getState, { getFirestore, getFirebase }) => {
        const db = getFirestore();
        const firebase = getFirebase();

        let user_snap = await db.doc(`users/${phone}`).get();

        if (!user_snap.exists) {
            dispatch({ type: 'AUTH_NOT_EXIST' });
            return;
        }

        //if exist

        try {
            let auth = await firebase.auth().signInAnonymously();

            dispatch({ type: 'AUTH_SIGN_IN', auth });
        } catch (err) {
            dispatch({ type: 'AUTH_ERROR', err });
        }
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'AUTH_SIGN_OUT' });
        })

    }
}

export const signUp = creds => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const db = getFirestore();

        const { phone, first_name, last_name } = creds;

        let user_snap = await db.doc(`users/${phone}`).get();
        if (user_snap.exists) {
            dispatch({ type: 'ALREADY_EXISTING_USER' });
            return;
        }

        db.doc(`users/${phone}`).set({
            first_name, last_name
        });

        let auth = await firebase.auth().signInAnonymously();
        dispatch({ type: 'AUTH_SIGN_IN', auth });
    }
}
