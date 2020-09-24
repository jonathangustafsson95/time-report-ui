import * as Types from "../Types/TaskTypes";

const initialState = {
  loading: false,
  tasksByWeek: [],
  error: "",
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_TASK_BY_WEEK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.FETCH_TASK_BY_WEEK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasksByWeek: action.payload,
        error: "",
      };
    case Types.FETCH_TASK_BY_WEEK_FAILURE:
      return {
        ...state,
        loading: false,
        tasksByWeek: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default taskReducer;
