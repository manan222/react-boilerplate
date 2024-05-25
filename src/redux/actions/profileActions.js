import axios from "axios";
import { toast } from "react-toastify";
import {
  NETWORK_ERROR,
  CREATE_PROFILE_URL,
  PROFILE_SUCCESS,
} from "../../constants/constant";
import { CREATE_PROFILE, CLEAR_PROFILE } from "../../constants/actionTypes";
import { stopLoader } from "../actions/loaderActions";

export const createProfile = (object, history) => (dispatch) => {
  const stringToken = localStorage.getItem("userToken");
  const token = JSON.parse(stringToken);

  const url = process.env.REACT_APP_URL + CREATE_PROFILE_URL;
  return axios
    .post(url, object, {
      headers: {
        AUTHORIZATION: token,
      },
    })
    .then((res) => {
      toast.success(PROFILE_SUCCESS);
      dispatch(stopLoader());
      dispatch({
        type: CREATE_PROFILE,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch(stopLoader());
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        history.push("/login");
      }
      toast.error(NETWORK_ERROR);
    });
};
export const clearProfile = () => {
  return { type: CLEAR_PROFILE };
};
