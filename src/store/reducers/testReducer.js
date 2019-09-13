import update from 'immutability-helper'

const initState = {
    tests: null,
    selected_test: null,
    selected_test_result: '',
    questions: null, 
    selected_question: null,
    selected_question_result: '',
    test_order: -1, 
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

        case 'TEST_LOADED':
            return {
                ...state,
                selected_test: action.result,
                selected_test_result: `SUCCESS${new Date().getTime()}`,
                test_order: action.result.current_order, 
            }

        case 'TEST_ID_NOT_VALID':
            return {
                ...state,
                selected_test: [],
                selected_test_result: `FAIL${new Date().getTime()}`
            }

        case 'TEST_UPDATED':
            return state;

        case 'QUESTION_ADDED':
            console.log('question added');
            let questions = state.questions ? state.questions : [];
            console.log(questions)
            questions = questions.concat(action.question);
            console.log(questions)
            questions.sort((a, b) => (
                a.order > b.order ? -1 : a.order < b.order ? 1 : 0
            ));

            return {
                ...state,
                questions, 
            }

        case 'ORDER_ALREADY_EXIST':
            alert("Existing order.")
            return state;

        case 'QUESTIONS_LOADED':
            return {
                ...state,
                questions: action.result, 
            }
        case 'QUESTION_LOADED':
            return {
                ...state,
                selected_question: action.result,
                selected_question_result: `SUCCESS${new Date().getTime()}`
            };

        case 'QUESTION_NOT_FOUND':
            return {
                ...state,
                selected_question_result: `FAIL${new Date().getTime()}`
            }

        case 'QUESTION_UPDATED':
            console.log('Question updated');
            alert('Question updated.');
            return state;

        case 'UPDATE_TEST_STATE':
            return {
                ...state,
                test_order: action.state, 
            }
        default:
            return state;
    }
}

export default testReducer