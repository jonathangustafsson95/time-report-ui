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
    case Types.UPDATE_NEW_REGISTRY_FROM_STORE:
      const updatedReg = action.payload[0];
      const regToReport = action.payload[1];
      return {
        ...state,
        registriesByWeek: state.registriesByWeek.map((registry) =>
          registry.registryId === action.id ? updatedReg : registry
        ),
        registriesToReport: state.registriesToReport.map((registry) =>
          registry.uuid === action.id ? regToReport : registry
        ),
      };
    case Types.UPDATE_OLD_REGISTRY_FROM_STORE:
      const updatedReg1 = action.payload[0];
      const regToReport1 = action.payload[1];

      const alreadyUpdated = state.registriesToReport.some(
        (registry) => registry.registryId === action.ids
      );

      if (alreadyUpdated) {
        return {
          ...state,
          registriesByWeek: state.registriesByWeek.map((registry) =>
            registry.registryId === action.id ? updatedReg1 : registry
          ),
          registriesToReport: state.registriesToReport.map((registry) =>
            registry.registryId === action.id ? regToReport1 : registry
          ),
        };
      } else {
        return {
          ...state,
          registriesByWeek: state.registriesByWeek.map((registry) =>
            registry.registryId === action.id ? updatedReg1 : registry
          ),
          registriesToReport: [...state.registriesToReport, regToReport1],
        };
      }

    default:
      return state;
  }
};

export default registryReducer;
