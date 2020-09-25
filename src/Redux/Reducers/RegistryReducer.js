import * as Types from "../Types/RegistryTypes";

const initialState = {
  loading: false,
  registriesByWeek: [],
  error: "",
  registriesToReport: []
};

const registryReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_REGISTRIES_BY_WEEK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.FETCH_REGISTRIES_BY_WEEK_SUCCESS:
      return {
        ...state,
        loading: false,
        registriesByWeek: action.payload,
        error: "",
      };
    case Types.FETCH_REGISTRIES_BY_WEEK_FAILURE:
      return {
        ...state,
        loading: false,
        registriesByWeek: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default registryReducer;
