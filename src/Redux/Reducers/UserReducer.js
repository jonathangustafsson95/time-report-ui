import * as Types from "../Types/UserTypes";

const initialState = {
  loading: false,
  user: [],
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: "",
      };
    case Types.FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
