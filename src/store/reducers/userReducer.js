const initState = {
    tests: null,

}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'AVAILABLE_TESTS_LOADED':
            return {
                ...state,
                tests: action.result, 
            }

        default:
            return state;
    }
}

export default userReducer