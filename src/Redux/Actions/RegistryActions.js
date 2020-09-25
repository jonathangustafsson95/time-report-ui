import * as Types from "../Types/RegistryTypes";
import axios from "axios";

export const fetchTasksByWeekRequest = () => {
  return {
    type: Types.FETCH_REGISTRIES_BY_WEEK_REQUEST,
  };
};

export const fetchTasksByWeekSuccess = (registries) => {
  return {
    type: Types.FETCH_REGISTRIES_BY_WEEK_SUCCESS,
    payload: registries,
  };
};

export const fetchTasksByWeekFailure = (error) => {
  return {
    type: Types.FETCH_REGISTRIES_BY_WEEK_FAILURE,
    payload: error,
  };
};

export const fetchTasksByWeek = () => {
  return (dispatch) => {
    dispatch(fetchTasksByWeekRequest);
    axios
      .get("http://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        const registries = response.data;
        dispatch(fetchTasksByWeekSuccess(registries));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchTasksByWeekFailure(errorMsg));
      });
  };
};
