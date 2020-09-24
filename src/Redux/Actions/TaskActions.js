import * as Types from "../Types/TaskTypes";
import axios from "axios";

export const fetchTasksByWeekRequest = () => {
  return {
    type: Types.FETCH_TASK_BY_WEEK_REQUEST,
  };
};

export const fetchTasksByWeekSuccess = (tasks) => {
  return {
    type: Types.FETCH_TASK_BY_WEEK_SUCCESS,
    payload: tasks,
  };
};

export const fetchTasksByWeekFailure = (error) => {
  return {
    type: Types.FETCH_TASK_BY_WEEK_FAILURE,
    payload: error,
  };
};

export const fetchTasksByWeek = () => {
  return (dispatch) => {
    dispatch(fetchTasksByWeekRequest);
    axios
      .get("http://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        const tasks = response.data;
        dispatch(fetchTasksByWeekSuccess(tasks));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchTasksByWeekFailure(errorMsg));
      });
  };
};
