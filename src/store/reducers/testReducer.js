import update from 'immutability-helper'

const initState = {
    tests: null,
}

const testReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GENERATE_TEST_SUCCESS':
            const { id, created_at, test } = action;
            
            return update(state, {
                'tests': {
                    $push: [{
                        id, created_at, ...test
                    }]
                }
            });

        case 'GENERATE_TEST_ERR':
            alert(action.err.message);
            return state;

        case 'TESTS_LOADED':
            return {
                ...state,
                tests: action.result,
            }
        default:
            return state;
    }
}

export default testReducer