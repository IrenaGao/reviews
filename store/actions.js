import * as actionTypes from './actionTypes';

export const storeContent = (content) => {
    return {
        type: actionTypes.APP_CONTENT_STORE,
        content: content
    };
};
