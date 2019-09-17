const initState = {
    results: [],
}

const resultReducer = (state = initState, action ) => {
    switch (action.type) {
        case 'RESULTED_LOADED':
            return {
                ...state,
                results: action.result
            }
        default: 
            return state
    }
}

export default resultReducer