import {
    START_LOADER,
    STOP_LOADER

} from "../../constants/actionTypes";

const initialState = {
    isLoading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case START_LOADER:
            return {
                ...state,
                isLoading: action.payload
            };
        case STOP_LOADER:
            return {
                ...state,
                isLoading: action.payload
            };
        default:
            return state;
    }
};