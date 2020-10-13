import * as Types from "../Types/MissionTypes";
import axios from "axios";
import * as service from "../ApiService/Service";

export const resetMissionsFromStore = () => {
  return {
    type: Types.RESET_MISSIONS_FROM_STORE,
  };
};

const fetchUserMissionsRequest = () => {
  return {
    type: Types.FETCH_USER_MISSIONS_REQUEST,
  };
};

const fetchUserMissionsSuccess = (missions) => {
  return {
    type: Types.FETCH_USER_MISSIONS_SUCCESS,
    payload: missions,
  };
};

const fetchUserMissionsFailure = (error) => {
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

const markMissionRequest = () => {
  return {
    type: Types.MARK_MISSION_REQUEST,
  };
};

const markMissionSuccess = () => {
  return {
    type: Types.MARK_MISSION_SUCCESS,
  };
};

const markMissionFailure = (error) => {
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

const unmarkMissionRequest = () => {
  return {
    type: Types.UNMARK_MISSION_REQUEST,
  };
};

const unmarkMissionSuccess = () => {
  return {
    type: Types.UNMARK_MISSION_SUCCESS,
  };
};

const unmarkMissionFailure = (error) => {
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

const fetchMissionDataRequest = () => {
  return {
    type: Types.FETCH_MISSION_DATA_REQUEST,
  };
};

const fetchMissionDataSuccess = (missions) => {
  return {
    type: Types.FETCH_MISSION_DATA_SUCCESS,
    payload: missions,
  };
};

const fetchMissionDataFailure = (error) => {
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
        }),
      ])
      .then((response) => {
        dispatch(fetchMissionDataSuccess(response));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchMissionDataFailure(error.message));
      });
  };
};

const fetchMissionsBySearchStringRequest = () => {
  return {
    type: Types.FETCH_MISSIONS_BY_SEARCHSTRING_REQUEST,
  };
};

const fetchMissionsBySearchStringSuccess = (missions) => {
  return {
    type: Types.FETCH_MISSIONS_BY_SEARCHSTRING_SUCCESS,
    payload: missions,
  };
};

const fetchMissionsBySearchStringFailure = (error) => {
  return {
    type: Types.FETCH_MISSIONS_BY_SEARCHSTRING_FAILURE,
    payload: error,
  };
};

export const fetchMissionsBySearchString = (searchString, token) => {
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

const fetchUserMarkedMissionsRequest = () => {
  return {
    type: Types.FETCH_USER_MARKED_MISSIONS_REQUEST,
  };
};

const fetchUserMarkedMissionsSuccess = (markedMissions) => {
  return {
    type: Types.FETCH_USER_MARKED_MISSIONS_SUCCESS,
    payload: markedMissions,
  };
};

const fetchUserMarkedMissionsFailure = (error) => {
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

const removeMissionMembershipRequest = () => {
  return {
    type: Types.REMOVE_MISSION_MEMBERSHIP_REQUEST,
  };
};

const removeMissionMembershipSuccess = () => {
  return {
    type: Types.REMOVE_MISSION_MEMBERSHIP_SUCCESS,
  };
};

const removeMissionMembershipFailure = (error) => {
  return {
    type: Types.REMOVE_MISSION_MEMBERSHIP_FAILURE,
    payload: error,
  };
};

export const removeMissionMembership = (token, userId, missionId) => {
  return (dispatch) => {
    dispatch(removeMissionMembershipRequest());
    axios({
      url: service.baseUrl + "/mission/DeleteMissionMember/" + userId + "/" + missionId,
      method: "delete",
      headers: { Authorization: "Bearer " + token },
    })
    .then(() => {
      dispatch(removeMissionMembershipSuccess());
    })
    .catch((error) => {
      dispatch(removeMissionMembershipFailure(error.message));
    });
  };
};

const addMissionMembershipRequest = () => {
  return {
    type: Types.ADD_MISSION_MEMBERSHIP_REQUEST,
  };
};

const addMissionMembershipSuccess = () => {
  return {
    type: Types.ADD_MISSION_MEMBERSHIP_SUCCESS,
  };
};

const addMissionMembershipFailure = (error) => {
  return {
    type: Types.ADD_MISSION_MEMBERSHIP_FAILURE,
    payload: error,
  };
};

export const addMissionMembership = (token, _missionMember) => {
  return (dispatch) => {
    dispatch(addMissionMembershipRequest());
    axios({
      url: service.baseUrl + "/mission/AddMissionMember",
      method: "post",
      data: _missionMember,
      headers: { Authorization: "Bearer " + token },
    })
    .then(() => {
      dispatch(addMissionMembershipSuccess());
    })
    .catch((error) => {
      dispatch(addMissionMembershipFailure(error.message));
    });
  };
};
