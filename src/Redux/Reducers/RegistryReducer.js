import * as Types from "../Types/RegistryTypes";

const initialState = {
  loading: false,
  registriesByWeek: [],
  registriesToReport: [],
  registriesToDelete: [],
  registriesToUpdate: [],
  errorMsg: "",
  error: false,
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
    case Types.SAVE_CHANGES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.SAVE_CHANGES_SUCCESS:
      return {
        ...state,
        loading: false,
        registriesByWeek: [],
        registriesToReport: [],
        registriesToDelete: [],
        errorMsg: "",
        error: false,
      };
    case Types.SAVE_CHANGES_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
        error: true,
      };
    case Types.REMOVE_NEW_REGISTRY_FROM_STORE:
      return {
        ...state,
        registriesByWeek: state.registriesByWeek.filter(
          (registry) => registry.registryId !== action.payload
        ),
        registriesToReport: state.registriesToReport.filter(
          (registry) => registry.uuid !== action.payload
        ),
      };
    case Types.REMOVE_REGISTRY_FROM_STORE:
      return {
        ...state,
        registriesByWeek: state.registriesByWeek.filter(
          (registry) => registry.registryId !== action.payload
        ),
        registriesToDelete: [...state.registriesToDelete, action.payload],
      };

    default:
      return state;
  }
};

export default registryReducer;
