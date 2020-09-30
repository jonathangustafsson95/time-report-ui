import * as Types from "../Types/RegistryTypes";

const initialState = {
  loading: false,
  registriesByWeek: [],
  errorMsg: "",
  error: false,
  registriesToReport: [],
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
        errorMsg: "",
        error: false,
      };
    case Types.FETCH_REGISTRIES_BY_WEEK_FAILURE:
      return {
        ...state,
        loading: false,
        registriesByWeek: [],
        errorMsg: action.payload,
        error: true,
      };
    case Types.ADD_REGISTRY_TO_STORE:
      return {
        ...state,
        registriesByWeek: [...state.registriesByWeek, action.payload[0]],
        registriesToReport: [...state.registriesToReport, action.payload[1]],
      };
    case Types.POST_REGISTRIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.POST_REGISTRIES_SUCCESS:
      return {
        ...state,
        loading: false,
        registriesByWeek: [],
        registriesToReport: [],
        errorMsg: "",
        error: false,
      };
    case Types.POST_REGISTRIES_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
        error: true,
      };
    case Types.DELETE_REGISTRY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.DELETE_REGISTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        //Remove specified registry
        errorMsg: "",
        error: false,
      };
    case Types.DELETE_REGISTRY_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
        error: true,
      };

    default:
      return state;
  }
};

export default registryReducer;
