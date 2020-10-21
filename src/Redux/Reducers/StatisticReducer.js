import * as Types from "../Types/StatisticTypes";

const initialState = {
  loading: false,
  taskStats: [],
  hoursOnCustomers: [],
  hoursOnCustomersInternal: [],
  errorMsg: "",
  error: false,
};

const statisticReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_TASK_STATS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.FETCH_TASK_STATS_SUCCESS:
      return {
        ...state,
        loading: false,
        taskStats: action.payload,
        errorMsg: "",
        error: false,
      };
    case Types.FETCH_TASK_STATS_FAILURE:
      return {
        ...state,
        loading: false,
        taskStats: [],
        errorMsg: action.payload,
        error: true,
      };
    case Types.FETCH_CUSTOMER_STATS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.FETCH_CUSTOMER_STATS_SUCCESS:
      return {
        ...state,
        loading: false,
        hoursOnCustomers: action.payload,
        errorMsg: "",
        error: false,
      };
    case Types.FETCH_CUSTOMER_STATS_FAILURE:
      return {
        ...state,
        loading: false,
        hoursOnCustomers: [],
        errorMsg: action.payload,
        error: true,
      };
    case Types.FETCH_CUSTOMER_INTERNAL_STATS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.FETCH_CUSTOMER_INTERNAL_STATS_SUCCESS:
      return {
        ...state,
        loading: false,
        hoursOnCustomersInternal: action.payload,
        errorMsg: "",
        error: false,
      };
    case Types.FETCH_CUSTOMER_INTERNAL_STATS_FAILURE:
      return {
        ...state,
        loading: false,
        hoursOnCustomersInternal: [],
        errorMsg: action.payload,
        error: true,
      };
    default:
      return state;
  }
};

export default statisticReducer;
