import axios from "axios";
import { toast } from "react-toastify";
import {
  GET_ALL_POSTS_URL,
  NETWORK_ERROR,
  CREATE_POST_URL,
  POST_SUCCESS,
  POST_DELETE_MESSAGE,
} from "../../constants/constant";
import {
  GET_ALL_POSTS,
  CREATE_POST,
  GET_POST,
  CLEAR_POSTS,
} from "../../constants/actionTypes";
import { stopLoader } from "../actions/loaderActions";

export const getAllPosts = () => (dispatch) => {
  const url = process.env.REACT_APP_URL + GET_ALL_POSTS_URL;
  axios
    .get(url)
    .then((res) => {
      dispatch(stopLoader());
      dispatch({
        type: GET_ALL_POSTS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch(stopLoader());
      toast.error(NETWORK_ERROR);
    });
};
export const createPost = (object, history) => (dispatch) => {
  const stringToken = localStorage.getItem("userToken");
  const token = JSON.parse(stringToken);
  const url = process.env.REACT_APP_URL + CREATE_POST_URL;
  axios
    .post(url, object, {
      headers: {
        AUTHORIZATION: token,
      },
    })
    .then((res) => {
      dispatch(stopLoader());
      toast.success(POST_SUCCESS);
      history.push("/");

      dispatch({
        type: CREATE_POST,
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
export const getPost = (id, history) => (dispatch) => {
  const stringToken = localStorage.getItem("userToken");
  const token = JSON.parse(stringToken);
  const url = process.env.REACT_APP_URL + `/posts/${id}`;
  axios
    .get(url, id, {
      headers: {
        AUTHORIZATION: token,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_POST,
        payload: res.data,
      });
    })
    .catch((error) => {
      toast.error(NETWORK_ERROR);
    });
};
export const deletePost = (id, history) => (dispatch) => {
  const stringToken = localStorage.getItem("userToken");
  const token = JSON.parse(stringToken);
  const url = process.env.REACT_APP_URL + `/posts/${id}`;
  axios
    .delete(url, {
      headers: {
        AUTHORIZATION: token,
      },
    })
    .then((res) => {
      dispatch(stopLoader());
      toast.success(POST_DELETE_MESSAGE);
      dispatch(getAllPosts());
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
export const clearPosts = () => {
  return { type: CLEAR_POSTS };
};
