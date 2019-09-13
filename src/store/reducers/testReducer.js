const initState = {
    tests: [],
}

const testReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GENERATE_TEST_SUCCESS':
            const { id, created_at, test } = action;
            return {
                ...state,
                tests: state.tests.push({
                    id, created_at,
                    ...test,
                })
            };

        case 'GENERATE_TEST_ERR':
            alert(action.err.message);
            return state;
            
        default:
            return state;
    }
}

export default testReducer