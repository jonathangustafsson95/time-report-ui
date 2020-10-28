import axios from "axios";
import * as Types from "../Types/StatisticTypes";
import * as service from "../ApiService/Service";
import { unAuthorize } from "./AuthActions";
import reduxStore from '../Store';

// LOCAL actions

export const resetStatisticDataStore = () => {
  return {
    type: Types.RESET_STATISTIC_DATA_STORE,
  }
}

// API actions

const axiosStatisticInstance = axios.create();

const fetchTaskStatsRequest = () => {
  return {
    type: Types.FETCH_TASK_STATS_REQUEST,
  };
};

const fetchTaskStatsSuccess = (stats) => {
  return {
    type: Types.FETCH_TASK_STATS_SUCCESS,
    payload: stats,
  };
};

const fetchTaskStatsFailure = (error) => {
  return {
    type: Types.FETCH_TASK_STATS_SUCCESS,
    payload: error,
  };
};

export const fetchTaskStats = (missionId) => {
  return (dispatch) => {
    dispatch(fetchTaskStatsRequest());
    axiosStatisticInstance({
      url: service.baseUrl + "/statistics/TaskStats/" + missionId,
      method: "get",
    })
      .then((response) => {
        dispatch(fetchTaskStatsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchTaskStatsFailure(error.response.data.message));
      });
  };
};

const fetchCustomerStatsRequest = () => {
  return {
    type: Types.FETCH_CUSTOMER_STATS_REQUEST,
  };
};

const fetchCustomerStatsSuccess = (data) => {
  return {
    type: Types.FETCH_CUSTOMER_STATS_SUCCESS,
    payload: data,
  };
};

const fetchCustomerStatsFailure = (error) => {
  return {
    type: Types.FETCH_CUSTOMER_STATS_FAILURE,
    payload: error,
  };
};

export const fetchCustomerStats = () => {
  const d = new Date();
  const stringDate =
    d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  return (dispatch) => {
    dispatch(fetchCustomerStatsRequest());
    axiosStatisticInstance({
      url: service.baseUrl + "/statistics/CustomerVsCustomer/" + stringDate,
      method: "get",
    })
      .then((response) => {
        dispatch(fetchCustomerStatsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchCustomerStatsFailure(error.message));
      });
  };
};

const fetchCustomerInternalStatsRequest = () => {
  return {
    type: Types.FETCH_CUSTOMER_INTERNAL_STATS_REQUEST,
  };
};

const fetchCustomerInternalStatsSuccess = (data) => {
  return {
    type: Types.FETCH_CUSTOMER_INTERNAL_STATS_SUCCESS,
    payload: data,
  };
};

const fetchCustomerInternalStatsFailure = (error) => {
  return {
    type: Types.FETCH_CUSTOMER_INTERNAL_STATS_FAILURE,
    payload: error,
  };
};

export const fetchCustomerInternalStats = () => {
  const d = new Date();
  const stringDate =
    d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  return (dispatch) => {
    dispatch(fetchCustomerInternalStatsRequest());
    axiosStatisticInstance({
      url: service.baseUrl + "/statistics/InternalVsCustomer/" + stringDate,
      method: "get",
    })
      .then((response) => {
        dispatch(fetchCustomerInternalStatsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchCustomerInternalStatsFailure(error.message));
      });
  };
};

// Request interceptor for API calls
axiosStatisticInstance.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
const {dispatch} = reduxStore;
axiosStatisticInstance.interceptors.response.use(
  response => response, 
  error => {
    if (error.response.status === 401 || error.response.status === 403) {
      dispatch(unAuthorize());
    }
    if (typeof(error.response) === 'undefined'){
      error.response = {data : {message:"Something went terribly wrong."}}
    }
    return Promise.reject(error);
  }
);
