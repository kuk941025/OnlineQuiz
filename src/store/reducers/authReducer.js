const initState = {
    auth_error: '',
    is_admin: false,
    sign_up_error: '', 
    user: null,
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

        case 'USER_DATA_LOADED':
            console.log(action.result);
            return {
                ...state,
                user: action.result
            }

        case 'USER_DATA_LOADED':
            alert("다른 위치에서 로그인되었습니다.");

            return state;

        default:
            return state;
    }
}

export default authReducer;