const initState = {
    auth_error: '',
    is_admin: false,
    sign_up_error: '', 
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'AUTH_NOT_EXIST':
            return {
                ...state,
                auth_error: '가입되지 않은 번호입니다.'
            }
        case 'AUTH_ERROR':
            return {
                ...state,
                auth_error: action.err.message,
            }

        case 'AUTH_SIGN_IN':
            return state;

        case 'AUTH_SIGN_OUT':
            return state;

        case 'ALREADY_EXISTING_USER':
            return {
                ...state,
                sign_up_error: '이미 가입되어 있는 번호입니다.'
            }
        default:
            return state;
    }
}

export default authReducer;