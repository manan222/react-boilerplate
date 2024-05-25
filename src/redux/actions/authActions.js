import axios from "axios";
import { toast } from "react-toastify";
import { LOGIN_URL, SIGN_UP_URL } from "../../constants/constant";
import { NETWORK_ERROR, SIGN_UP_SUCCESS } from "../../constants/constant";
import { LOGGED_IN_USER } from "../../constants/actionTypes";
import { stopLoader } from "../actions/loaderActions";

export const createAccount = (data, history) => (dispatch) => {
  const url = process.env.REACT_APP_URL + SIGN_UP_URL;
  axios
    .post(url, data)
    .then((res) => {
      toast.success(SIGN_UP_SUCCESS);
      history.push("/login");
      dispatch({
        type: LOGGED_IN_USER,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch(stopLoader());
      error.response
        ? toast.error(error.response.data.email)
        : toast.error(NETWORK_ERROR);
    });
};
export const login = (credentials, history) => (dispatch) => {
  const url = process.env.REACT_APP_URL + LOGIN_URL;
  axios
    .post(url, credentials)
    .then((res) => {
      const token = JSON.stringify(res.data.token);
      localStorage.setItem("userToken", token);
      history.push("/posts");
      dispatch({
        type: LOGGED_IN_USER,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch(stopLoader());
      error.response
        ? toast.error(error.response.data.email)
        : toast.error(NETWORK_ERROR);
    });
};
