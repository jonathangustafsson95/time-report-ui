import * as Types from "../Types/AuthTypes";

const initialState = {
  loading: false,
  user: null,
  errorMsg: "",
  error: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.AUTHORIZATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.AUTHORIZATION_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        errorMsg: "",
        error: false,
      };
    case Types.AUTHORIZATION_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
        error: true,
      };
    case Types.UN_AUTHORIZATION:
      return {
        ...state,
        user: null,
      }

    default:
      return state;
  }
};

export default authReducer;
