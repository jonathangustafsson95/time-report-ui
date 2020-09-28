import * as Types from "../Types/RegistryTypes";
import axios from "axios";

export const fetchRegistriesByWeekRequest = () => {
  return {
    type: Types.FETCH_REGISTRIES_BY_WEEK_REQUEST,
  };
};

export const fetchRegistriesByWeekSuccess = (registries) => {
  return {
    type: Types.FETCH_REGISTRIES_BY_WEEK_SUCCESS,
    payload: registries,
  };
};

export const fetchRegistriesByWeekFailure = (error) => {
  return {
    type: Types.FETCH_REGISTRIES_BY_WEEK_FAILURE,
    payload: error,
  };
};

export const fetchRegistriesByWeek = () => {
  return (dispatch) => {
    dispatch(fetchRegistriesByWeekRequest);
    axios
      .get("http://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        const registries = response.data;
        dispatch(fetchRegistriesByWeekSuccess(registries));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchRegistriesByWeekFailure(errorMsg));
      });
  };
};
