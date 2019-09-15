const initState = {
    tests: null,
    test: null,
    test_msg: '',
    test_snap: null,
    questions: null,
    question_snap: null,
    selected_question: null,   
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'AVAILABLE_TESTS_LOADED':
            return {
                ...state,
                tests: action.result, 
            }

        case 'CONNECTION_TO_TEST_NOT_VALID':
            return {
                ...state,
                test_msg: '잘못된 주소입니다.',
            }

        case 'CONNECTED_TO_TEST':
            return {
                ...state,
                test: action.result,
                test_msg: `SUCCESS${new Date().getTime()}`
            }

        case 'INIT_USER_DATA':
            return initState;

        case 'USER_TEST_TRANSACTION_COMPLETE':
            return {
                ...state,     
                test_snap: action.test_snap
            }
            
        case 'DISCONNECTED_FROM_TEST':
            return {
                ...state,
                test_snap: null,
            }

        case 'USER_QUESTIONS_LOADED':
            return {
                ...state,
                questions: action.result,
            }

        case 'USER_CONNECTION_TO_QUESTION':
            return {
                ...state,
                question_snap: action.question_snap
            }

        case 'CONNECTED_TO_QUESTION':
            return {
                ...state,
                selected_question: action.result, 
            }
        default:
            return state;
    }
}

export default userReducer