import * as Types from "../Types/RegistryTypes";
import axios from "axios";
import * as service from "../ApiService/Service";

// LOCAL ACTIONS

export const addRegistryToStore = (registryData) => {
  return {
    type: Types.ADD_REGISTRY_TO_STORE,
    payload: registryData,
  };
};

export const addTemplateRegistryToStore = (registry) => {
  return {
    type: Types.ADD_TEMPLATE_REGISTRY_TO_STORE,
    payload: registry,
  };
};

export const removeNewRegistryFromStore = (registry) => {
  return {
    type: Types.REMOVE_NEW_REGISTRY_FROM_STORE,
    payload: registry.registryId,
  };
};

export const removeRegistryFromStore = (registry) => {
  return {
    type: Types.REMOVE_REGISTRY_FROM_STORE,
    payload: registry.registryId,
  };
};

export const removeTemplateRegistriesFromStore = () => {
  return {
    type: Types.REMOVE_TEMPLATE_REGISTRIES_FROM_STORE,
  };
};

export const updateNewRegistryFromStore = (registries) => {
  return {
    type: Types.UPDATE_NEW_REGISTRY_FROM_STORE, 
    payload: registries,
    id: registries[0].registryId,
  };
};

export const updateOldRegistryFromStore = (registries) => {
  console.log(registries[0]);
  return {
    type: Types.UPDATE_OLD_REGISTRY_FROM_STORE,
    payload: registries,
    id: registries[0].registryId,
  };
};

export const commitRegistryFromTemplateToStore = (registry) => {
  return {
    type: Types.COMMIT_REGISTRY_FROM_TEMPLATE_TO_STORE,
    payload: registry,
    id: registry.uuid,
  };
};

// API-ACTIONNS

const fetchRegistriesByWeekRequest = () => {
  return {
    type: Types.FETCH_REGISTRIES_BY_WEEK_REQUEST,
  };
};

const fetchRegistriesByWeekSuccess = (registries) => {
  return {
    type: Types.FETCH_REGISTRIES_BY_WEEK_SUCCESS,
    payload: registries,
  };
};

const fetchRegistriesByWeekFailure = (error) => {
  return {
    type: Types.FETCH_REGISTRIES_BY_WEEK_FAILURE,
    payload: error,
  };
};

export const fetchRegistriesByWeek = (token) => {
  return (dispatch) => {
    const date = new Date();
    const stringDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    dispatch(fetchRegistriesByWeekRequest());
    axios({
      url: service.baseUrl + "/reporting/week/" + stringDate,
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        const registries = response.data;
        registries.forEach((registry) => {
          registry.new = false;
          registry.isFromTemplate = false;
        });
        dispatch(fetchRegistriesByWeekSuccess(registries));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchRegistriesByWeekFailure(errorMsg));
      });
  };
};

const fetchRegistriesLastWeeksRequest = () => {
  return {
    type: Types.FETCH_REGISTRIES_LAST_WEEKS_REQUEST,
  };
};

const fetchRegistriesLastWeeksSuccess = (weeks) => {
  return {
    type: Types.FETCH_REGISTRIES_LAST_WEEKS_SUCCESS,
    payload: weeks,
  };
};

const fetchRegistriesLastWeeksFailure = (error) => {
  return {
    type: Types.FETCH_REGISTRIES_LAST_WEEKS_FAILURE,
    payload: error,
  };
};

export const fetchRegistriesLastWeeks = (token) => {
  return (dispatch) => {
    const date = new Date();
    const stringDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    dispatch(fetchRegistriesLastWeeksRequest());
    axios({
      url: service.baseUrl + "/reporting/weekTemplates/" + stringDate,
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        dispatch(fetchRegistriesLastWeeksSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchRegistriesLastWeeksFailure(error.message));
      });
  };
};

const fetchLatestRegistriesRequest = () => {
  return {
    type: Types.FETCH_LATEST_REGISTRIES_REQUEST,
  };
};

const fetchLatestRegistriesSuccess = (weeks) => {
  return {
    type: Types.FETCH_LATEST_REGISTRIES_SUCCESS,
    payload: weeks,
  };
};

const fetchLatestRegistriesFailure = (error) => {
  return {
    type: Types.FETCH_LATEST_REGISTRIES_FAILURE,
    payload: error,
  };
};

export const fetchLatestRegistries = (token) => {
  return (dispatch) => {
    dispatch(fetchLatestRegistriesRequest());
    axios({
      url: service.baseUrl + "/reporting/latestRegistries/",
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        dispatch(fetchLatestRegistriesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchLatestRegistriesFailure(error.message));
      });
  };
};

const saveChangesRequest = () => {
  return {
    type: Types.SAVE_CHANGES_REQUEST,
  };
};

const saveChangesSuccess = () => {
  return {
    type: Types.SAVE_CHANGES_SUCCESS,
  };
};

const saveChangesFailure = (error) => {
  return {
    type: Types.SAVE_CHANGES_FAILURE,
    payload: error,
  };
};

export const saveChanges = (registriesToReport, registriesToDelete, token) => {
  return (dispatch) => {
    const postPayload = {
      registriesToReport: registriesToReport,
    };
    const deletePayload = {
      registriesToDelete: registriesToDelete,
    };
    dispatch(saveChangesRequest());
    axios
      .all([
        axios({
          url: service.baseUrl + "/reporting/TimeReport",
          method: "post",
          data: postPayload,
          headers: { Authorization: "Bearer " + token },
        }),
        axios({
          url: service.baseUrl + "/reporting/TimeReport",
          method: "delete",
          data: deletePayload,
          headers: { Authorization: "Bearer " + token },
        }),
      ])
      .then(() => {
        dispatch(saveChangesSuccess());
      })
      .catch((error) => {
        dispatch(saveChangesFailure(error.message));
      });
  };
};
