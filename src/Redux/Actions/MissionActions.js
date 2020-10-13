import * as Types from "../Types/MissionTypes";
import axios from "axios";
import * as service from "../ApiService/Service";

export const resetMissionsFromStore = () => {
  return {
    type: Types.RESET_MISSIONS_FROM_STORE,
  }
}

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

export const markMissionRequest = () => {
  return {
    type: Types.MARK_MISSION_REQUEST,
  };
};

export const markMissionSuccess = () => {
  return {
    type: Types.MARK_MISSION_SUCCESS,
  };
};

export const markMissionFailure = (error) => {
  return {
    type: Types.MARK_MISSION_FAILURE,
    payload: error,
  };
};

export const markMission = (favoriteMission, token) => {
  return (dispatch) => {
    dispatch(markMissionRequest());
    axios({
      url: service.baseUrl + "/mission/AddFavoriteMission",
      method: "post",
      data: favoriteMission,
      headers: { Authorization: "Bearer " + token },
    })
      .then(() => {
        dispatch(markMissionSuccess());
      })
      .catch((error) => {
        dispatch(markMissionFailure(error.message));
      });
  };
};

export const unmarkMissionRequest = () => {
  return {
    type: Types.UNMARK_MISSION_REQUEST,
  };
};

export const unmarkMissionSuccess = () => {
  return {
    type: Types.UNMARK_MISSION_SUCCESS,
  };
};

export const unmarkMissionFailure = (error) => {
  return {
    type: Types.UNMARK_MISSION_FAILURE,
    payload: error,
  };
};

export const unmarkMission = (favoriteMission, token) => {
  return (dispatch) => {
    dispatch(unmarkMissionRequest());
    axios({
      url: service.baseUrl + "/mission/FavoriteMission",
      method: "delete",
      data: favoriteMission,
      headers: { Authorization: "Bearer " + token },
    })
      .then(() => {
        dispatch(unmarkMissionSuccess());
      })
      .catch((error) => {
        dispatch(unmarkMissionFailure(error.message));
      });
  };
};

export const fetchMissionDataRequest = () => {
  return {
    type: Types.FETCH_MISSION_DATA_REQUEST,
  };
};

export const fetchMissionDataSuccess = (missions) => {
  return {
    type: Types.FETCH_MISSION_DATA_SUCCESS,
    payload: missions,
  };
};

export const fetchMissionDataFailure = (error) => {
  return {
    type: Types.FETCH_MISSION_DATA_FAILURE,
    payload: error,
  };
};

export const fetchMissionData = (token) => {
  return (dispatch) => {
    dispatch(fetchMissionDataRequest());
    axios
      .all([
        axios({
          url: service.baseUrl + "/mission/UserMissions",
          method: "get",
          headers: { Authorization: "Bearer " + token },
        }),
        axios({
          url: service.baseUrl + "/mission/GetFavoriteMissions",
          method: "get",
          headers: { Authorization: "Bearer " + token },
        })]
      )
      .then((response) => {
        dispatch(fetchMissionDataSuccess(response));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchMissionDataFailure(error.message));
      });
  };
};

export const fetchMissionsBySearchStringRequest = () => {
  return {
    type: Types.FETCH_MISSIONS_BY_SEARCHSTRING_REQUEST,
  };
};

export const fetchMissionsBySearchStringSuccess = (missions) => {
  return {
    type: Types.FETCH_MISSIONS_BY_SEARCHSTRING_SUCCESS,
    payload: missions,
  };
};

export const fetchMissionsBySearchStringFailure = (error) => {
  return {
    type: Types.FETCH_MISSIONS_BY_SEARCHSTRING_FAILURE,
    payload: error,
  };
};

export const fetchMissionsBySearchString = (searchString, token) => {
  console.log(token);
  return (dispatch) => {
    dispatch(fetchMissionsBySearchStringRequest());
    axios({
      url:
        service.baseUrl +
        "/mission/GetAllMissionsBySearchString/" +
        searchString,
      method: "get",
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        console.log(response.data);
        dispatch(fetchMissionsBySearchStringSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchMissionsBySearchStringFailure(error));
      });
  };
};

export const fetchUserMarkedMissionsRequest = () => {
  return {
    type: Types.FETCH_USER_MARKED_MISSIONS_REQUEST,
  };
};

export const fetchUserMarkedMissionsSuccess = (markedMissions) => {
  return {
    type: Types.FETCH_USER_MARKED_MISSIONS_SUCCESS,
    payload: markedMissions,
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
      url: service.baseUrl + "/mission/GetFavoriteMissions",
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
