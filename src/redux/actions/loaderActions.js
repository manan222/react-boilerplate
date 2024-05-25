import {
    STOP_LOADER,
    START_LOADER
} from "../../constants/actionTypes";

export const startLoader = () => (dispatch) => {
    dispatch({
        type: START_LOADER,
        payload: true,
    });

}
export const stopLoader = () => (dispatch) => {
    dispatch({
        type: STOP_LOADER,
        payload: false,
    });

}