import * as actionTypes from './actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
    content: null,
};

const appContentStore = (action) => {
    return {
        content: action.content
    };
};


const getNewState = (state, action) => {
    switch (action.type) {
        case (actionTypes.APP_CONTENT_STORE):
            return appContentStore(action);
        default:
            return null;
    };
};

const reducer = (state = initialState, action) => {
    const newState = getNewState(state, action);
    return updateObject(state, newState);
};

export default reducer;