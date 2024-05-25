import { CREATE_PROFILE, CLEAR_PROFILE } from "../../constants/actionTypes";

const initialState = {
  profile: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
      };

    default:
      return state;
  }
};
