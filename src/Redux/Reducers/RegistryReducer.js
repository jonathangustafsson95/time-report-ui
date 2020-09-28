import * as Types from "../Types/RegistryTypes";

const initialState = {
  loading: false,
  registriesByWeek: [
    {
      registryId: 1,
      hours: 2,
      dayOfWeek: 0,
      projectName: "Project 1",
      taskName: "Task 1",
    },
    {
      registryId: 2,
      hours: 3,
      dayOfWeek: 1,
      projectName: "Project 1",
      taskName: "Task 2",
    },
    {
      registryId: 3,
      hours: 2,
      dayOfWeek: 2,
      projectName: "Project 1",
      taskName: "Task 3",
    },
    {
      registryId: 3,
      hours: 1,
      dayOfWeek: 0,
      projectName: "Project 1",
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
    default:
      return state;
  }
};

export default registryReducer;
