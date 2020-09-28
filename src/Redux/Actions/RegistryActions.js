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
      .get("https://localhost:44362/api/reporting/getweek/2021-01-02")
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

export const addRegistryToStore = (registryData) => {
  return {
    type: Types.ADD_REGISTRY_TO_STORE,
    payload: registryData,
  };
};

export const postRegistriesRequest = () => {
  return {
    type: Types.POST_REGISTRIES_REQUEST,
  };
};

export const postRegistriesSuccess = () => {
  return {
    type: Types.POST_REGISTRIES_SUCCESS,
  };
};

export const postRegistriesFailure = (error) => {
  return {
    type: Types.POST_REGISTRIES_FAILURE,
    payload: error,
  };
};

export const postRegistries = (Registries) => {
  return (dispatch) => {
    dispatch(postRegistriesRequest);
    axios
      .post(
        "https://localhost:44362/api/reporting/getweek/2021-01-02",
        Registries
      )
      .then((response) => {
        const registries = response.data;
        dispatch(postRegistriesSuccess);
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(postRegistriesFailure(errorMsg));
      });
  };
};
