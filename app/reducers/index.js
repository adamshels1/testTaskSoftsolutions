// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers
import userReducer from './userReducer';

// Redux: Root Reducer
const appReducer = combineReducers({
    userReducer
});

const rootReducer = (state, action) => {
    // when a logout action is dispatched it will reset redux state
    if (action.type === 'RESET_STATE') {
        state = undefined;
    }

    return appReducer(state, action);
};

// Exports
export default rootReducer;
