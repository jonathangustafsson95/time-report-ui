import * as Types from "../Types/MissionTypes";
import axios from "axios";
import * as service from "../ApiService/Service";

export const fetchUserMissionsRequest = () => {
  return {
    type: Types.FETCH_USER_MISSIONS_REQUEST,
  };
};

export const fetchUserMissionsSuccess = (missions) => {
  return {
    type: Types.FETCH_USER_MISSIONS_SUCCESS,
    payload: missions,
  };
};

export const fetchUserMissionsFailure = (error) => {
  return {
    type: Types.FETCH_USER_MISSIONS_FAILURE,
    payload: error,
  };
};

export const fetchUserMissions = (token) => {
  return (dispatch) => {
    dispatch(fetchUserMissionsRequest());
    axios({
      url: service.baseUrl + "/mission/UserMissions",
      method: "get",
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        dispatch(fetchUserMissionsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchUserMissionsFailure(error));
      });
  };
};

export const fetchUserMarkedMissionsRequest = () => {
  return {
    type: Types.FETCH_USER_MARKED_MISSIONS_REQUEST,
  };
};

export const fetchUserMarkedMissionsSuccess = (missions) => {
  return {
    type: Types.FETCH_USER_MARKED_MISSIONS_SUCCESS,
    payload: missions,
  };
};

export const fetchUserMarkedMissionsFailure = (error) => {
  return {
    type: Types.FETCH_USER_MARKED_MISSIONS_FAILURE,
    payload: error,
  };
};

export const fetchUserMarkedMissions = (token) => {
  return (dispatch) => {
    dispatch(fetchUserMarkedMissionsRequest());
    axios({
      url: service.baseUrl + "/test",
      method: "get",
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        dispatch(fetchUserMarkedMissionsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchUserMarkedMissionsFailure(error.message));
      });
  };
};
