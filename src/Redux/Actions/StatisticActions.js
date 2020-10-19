import axios from "axios";
import * as Types from "../Types/StatisticTypes";
import * as service from "../ApiService/Service";

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

export const fetchTaskStats = (token, missionId) => {
  return (dispatch) => {
    dispatch(fetchTaskStatsRequest());
    axios({
      url: service.baseUrl + "/statistics/GetTaskStats/" + missionId,
      method: "get",
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        dispatch(fetchTaskStatsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchTaskStatsFailure(error.message));
      });
  };
};
