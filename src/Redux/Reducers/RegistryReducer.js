import * as Types from "../Types/RegistryTypes";

const initialState = {
  loading: false,
  registriesByWeek: [
    {
      registryId: 1,
      hours: 2,
      day: 0,
      missionName: "Project 1",
      taskName: "Task 1",
    },
    {
      registryId: 2,
      hours: 3,
      day: 1,
      missionName: "Project 1",
      taskName: "Task 2",
    },
    {
      registryId: 3,
      hours: 2,
      day: 2,
      missionName: "Project 1",
      taskName: "Task 3",
    },
    {
      registryId: 3,
      hours: 1,
      day: 0,
      missionName: "Project 1",
      taskName: "Task 4",
    },
  ],
  error: "",
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
        error: "",
      };
    case Types.FETCH_REGISTRIES_BY_WEEK_FAILURE:
      return {
        ...state,
        loading: false,
        registriesByWeek: [],
        error: action.payload,
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
      };
    case Types.POST_REGISTRIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default registryReducer;
