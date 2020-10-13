import * as Types from "../Types/RegistryTypes";

const initialState = {
  loading: false,
  registriesByWeek: [],
  registriesToReport: [],
  registriesToDelete: [],
  registriesToUpdate: [],
  latestRegistries: [],
  weeklyRegistries: [],
  isSuccesfullySaved: false,
  hasLoadedFromTemplate: false,
  errorMsg: "",
  error: false,
};

const registryReducer = (state = initialState, action) => {
  switch (action.type) {
    // LOCAL state manipulators
    case Types.ADD_REGISTRY_TO_STORE:
      return {
        ...state,
        registriesByWeek: [...state.registriesByWeek, action.payload[0]],
        registriesToReport: [...state.registriesToReport, action.payload[1]],
      };

    case Types.ADD_TEMPLATE_REGISTRY_TO_STORE:
      return {
        ...state,
        registriesByWeek: [...state.registriesByWeek, action.payload],
        hasLoadedFromTemplate: true,
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
        registriesToReport: state.registriesToReport.filter(
          (registry) => registry.uuid !== action.payload
        ),
        registriesToDelete: [...state.registriesToDelete, action.payload],
      };

    case Types.REMOVE_TEMPLATE_REGISTRIES_FROM_STORE:
      return {
        ...state,
        registriesByWeek: state.registriesByWeek.filter(
          (registry) => !registry.isFromTemplate
        ),
      };

    case Types.UPDATE_NEW_REGISTRY_FROM_STORE:
      const updatedReg = action.payload[0];
      const regToReport = action.payload[1];
      console.log(state.registriesByWeek);
      console.log(updatedReg);
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
        (registry) => registry.registryId === action.id
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

    case Types.COMMIT_REGISTRY_FROM_TEMPLATE_TO_STORE:
      let registries = state.registriesByWeek.slice();

      registries.map((reg) => {
        if (reg.registryId === action.id) {
          reg.isFromTemplate = false;
        }
        return reg;
      });

      return {
        ...state,
        registriesToReport: [...state.registriesToReport, action.payload],
        registriesByWeek: registries,
      };
    case Types.RESET_IS_SUCCESFULLY_SAVED_FROM_STORE:
      return {
        ...state,
        isSuccesfullySaved: false,
      };

    // API state manipulators
    case Types.FETCH_TIME_REPORT_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.FETCH_TIME_REPORT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        registriesByWeek: action.payload[0].data,
        weeklyRegistries: action.payload[1].data,
        latestRegistries: action.payload[2].data,
        errorMsg: "",
        error: false,
      };
    case Types.FETCH_TIME_REPORT_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        registriesByWeek: [],
        latestRegistries: [],
        weeklyRegistries: [],
        errorMsg: action.payload,
        error: true,
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
        isSuccesfullySaved: true,
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

    default:
      return state;
  }
};

export default registryReducer;
