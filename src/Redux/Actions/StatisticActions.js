import axios from "axios";
import * as Types from "../Types/StatisticTypes";
import * as service from "../ApiService/Service";
import {unAuthorize} from './AuthActions'

// API actions

export const fetchTaskStatsRequest = () => {
  return {
    type: Types.FETCH_TASK_STATS_REQUEST,
  };
};

export const fetchTaskStatsSuccess = (stats) => {
  return {
    type: Types.FETCH_TASK_STATS_SUCCESS,
    payload: stats,
  };
};

export const fetchTaskStatsFailure = (error) => {
  return {
    type: Types.FETCH_TASK_STATS_SUCCESS,
    payload: error,
  };
};

export const fetchTaskStats = (missionId) => {
  return (dispatch) => {
    dispatch(fetchTaskStatsRequest());
    axios({
      url: service.baseUrl + "/statistics/GetTaskStats/" + missionId,
      method: "get",
    })
      .then((response) => {
        dispatch(fetchTaskStatsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchTaskStatsFailure(error.message));
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

