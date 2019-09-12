const initState = {
    test: [],
}

const tempReducer = (state = initState, action) => {
    switch (action.type) {
        case 'TEST':
            return state;

        default:
            return state;
    }
}

export default tempReducer