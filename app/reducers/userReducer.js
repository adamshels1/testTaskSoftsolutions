const initialState = {
    token: null,
    user: null
};

export default userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER': {
            return {
                ...state,
                user: action.payload,
            }
        }

        case 'SET_TOKEN': {
            return {
                ...state,
                token: action.payload,
            }
        }

        default: {
            return state;
        }
    }
};
