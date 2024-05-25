import { LOGGED_IN_USER } from "../../constants/actionTypes";

const initialState = {
    user: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGGED_IN_USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};