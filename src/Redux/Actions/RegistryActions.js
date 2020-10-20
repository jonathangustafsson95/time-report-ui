import * as Types from "../Types/RegistryTypes";
import axios from "axios";
import * as service from "../ApiService/Service";
import {unAuthorize} from './AuthActions'

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

export const resetIsSuccesfullySaved = () => {
  return {
    type: Types.RESET_IS_SUCCESFULLY_SAVED_FROM_STORE,
  };
};

// API-ACTIONNS

const fetchTimeReportDataRequest = () => {
  return {
    type: Types.FETCH_TIME_REPORT_DATA_REQUEST,
  };
};

const fetchTimeReportDataSuccess = (timeReportData) => {
  return {
    type: Types.FETCH_TIME_REPORT_DATA_SUCCESS,
    payload: timeReportData,
  };
};

const fetchTimeReportDataFailure = (error) => {
  return {
    type: Types.FETCH_TIME_REPORT_DATA_FAILURE,
    payload: error,
  };
};

export const fetchTimeReportData = (date) => {
  return (dispatch) => {
    const d = new Date();
    const stringDateForWeekTemp = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    const stringDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    dispatch(fetchTimeReportDataRequest());
    axios
      .all([
        axios({
          url: service.baseUrl + "/reporting/week/" + stringDate,
          method: "get",
        }),
        axios({
          url: service.baseUrl + "/reporting/weekTemplates/" + stringDateForWeekTemp,
          method: "get",
        }),
        axios({
          url: service.baseUrl + "/reporting/latestRegistries/",
          method: "get",
        }),
      ])
      .then((response) => {
        dispatch(fetchTimeReportDataSuccess(response));
      })
      .catch((error) => {
        dispatch(fetchTimeReportDataFailure(error.message));
      });
  };
};

const fetchTimeReportDayDataRequest = () => {
  return {
    type: Types.FETCH_TIME_REPORT_DAY_DATA_REQUEST,
  };
};

const fetchTimeReportDayDataSuccess = (timeReportData) => {
        return {
    type: Types.FETCH_TIME_REPORT_DAY_DATA_SUCCESS,
    payload: timeReportData,
  };
};

const fetchTimeReportDayDataFailure = (error) => {
        return {
    type: Types.FETCH_TIME_REPORT_DAY_DATA_FAILURE,
    payload: error,
  };
};

export const fetchTimeReportDayData = (date) => {
  return (dispatch) => {
    const stringDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    dispatch(fetchTimeReportDayDataRequest());
    axios
      .all([
        axios({
          url: service.baseUrl + "/reporting/day/" + stringDate,
          method: "get",
        }),
        axios({
          url: service.baseUrl + "/reporting/latestRegistries/",
          method: "get",
        }),
      ])
      .then((response) => {
        dispatch(fetchTimeReportDayDataSuccess(response));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchTimeReportDayDataFailure(error.message));
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

export const saveChanges = (registriesToReport, registriesToDelete) => {
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
        }),
        axios({
          url: service.baseUrl + "/reporting/TimeReport",
          method: "delete",
          data: deletePayload,
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

// Request interceptor for API calls
axios.interceptors.request.use(
  async config => {
    console.log(config)
    config.headers.Authorization = "Bearer " + localStorage.getItem('token');
    return config;
  },
  error => {
    Promise.reject(error)
});

// Response interceptor for API calls
axios.interceptors.response.use((response) => {
  return response
}, async function (error) {
  if (error.response.status === 401) {
    unAuthorize();
  }
  return Promise.reject(error);
});