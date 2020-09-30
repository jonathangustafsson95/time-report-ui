import * as Types from "../Types/RegistryTypes";
import axios from "axios";
import * as service from "../ApiService/Service";

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
    const date = new Date();
    const stringDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    dispatch(fetchRegistriesByWeekRequest());
    axios
      .get(service.baseUrl + "/reporting/getweek/" + stringDate)
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

export const postRegistries = (registries) => {
  console.log(registries);
  return (dispatch) => {
    dispatch(postRegistriesRequest());
    let payload = {
      registriesToReport: registries,
    };
    axios({
      url: service.baseUrl + "/reporting/AddTimeReport",
      method: "post",
      data: payload,
    })
      .then(() => {
        dispatch(postRegistriesSuccess());
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(postRegistriesFailure(errorMsg));
      });
  };
};
