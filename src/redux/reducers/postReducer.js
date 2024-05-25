import {
  GET_ALL_POSTS,
  CREATE_POST,
  GET_POST,
  CLEAR_POSTS,
} from "../../constants/actionTypes";

const initialState = {
  posts: [],
  post: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case CREATE_POST:
      return {
        ...state,
        post: action.payload,
      };
    case CLEAR_POSTS:
      return {
        ...state,
        posts: [],
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
      };
    default:
      return state;
  }
};
