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
            db.doc(`users/${phone}`).update({
                uid: auth.user.uid,
            })
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



        let auth = await firebase.auth().signInAnonymously();
        db.doc(`users/${phone}`).set({
            first_name, last_name, uid: auth.user.uid,
        });
        dispatch({ type: 'AUTH_SIGN_IN', auth });
    }
}

export const getUserData = () => {
    return async (dispatch, getState, { getFirestore }) => {
        const uid = getState().firebase.auth.uid;
        const db = getFirestore();

        let user_snap = await db.collection(`users`).where('uid', '==', uid).limit(1).get();

        let user = user_snap.docs[0];

        dispatch({ type: 'USER_DATA_LOADED', result: {phone: user.id, ...user.data()} })
    }
}