import * as Types from "../Types/StatisticTypes";

const initialState = {
  loading: false,
  taskStats: [
    {
      taskName: "task1",
      taskId: 1,
      actualHours: 10,
      estimatedHours: 15,
    },
    {
      taskName: "task2",
      taskId: 2,
      actualHours: 5,
      estimatedHours: 30,
    },
    {
      taskName: "task3",
      taskId: 3,
      actualHours: 20,
      estimatedHours: 15,
    },
    {
      taskName: "task4",
      taskId: 3,
      actualHours: 20,
      estimatedHours: 15,
    },
    {
      taskName: "task5",
      taskId: 3,
      actualHours: 20,
      estimatedHours: 15,
    },
  ],
  hoursOnCustomers: [
    {
      customerName: "DHL",
      hours: 40,
    },
    {
      customerName: "IKEA",
      hours: 100,
    },
    {
      customerName: "ICA",
      hours: 10,
    },
    {
      customerName: "INTERNAL",
      hours: 150,
    },
  ],
  hoursOnCustomersInternal: [
    {
      month: "June",
      customerTime: 100,
      internalTime: 150,
    },
    {
      month: "July",
      customerTime: 150,
      internalTime: 120,
    },
    {
      month: "August",
      customerTime: 200,
      internalTime: 100,
    },
    {
      month: "September",
      customerTime: 50,
      internalTime: 200,
    },
    {
      month: "October",
      customerTime: 210,
      internalTime: 70,
    },
  ],
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
    default:
      return state;
  }
};

export default statisticReducer;