import * as Types from "../Types/MissionTypes";
import axios from "axios";
import * as service from "../ApiService/Service";
import { unAuthorize } from "./AuthActions";

const axiosMissionInstance = axios.create();

// LOCAL actions

export const resetMissionDataStore = () => {
  return {
    type: Types.RESET_MISSION_DATA_STORE,
  }
}

export const resetMissionsFromStore = () => {
  return {
    type: Types.RESET_MISSIONS_FROM_STORE,
  };
};

export const filterMissionsBySearchstring = (searchString) => {
  return {
    type: Types.FILTER_MISSIONS_BY_SEARCHSTRING,
    payload: searchString,
  };
};

export const changeCurrentTableType = (type) => {
  return {
    type: Types.CHANGE_CURRENT_TABLE_TYPE,
    payload: type,
  };
};

// API actions

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

export const fetchUserMissions = (taskId) => {
  return (dispatch) => {
    dispatch(fetchUserMissionsRequest());
    axiosMissionInstance({
      url: service.baseUrl + "/mission/UserMissions/" + taskId,
      method: "get",
    })
      .then((response) => {
        dispatch(fetchUserMissionsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchUserMissionsFailure(error.response.data.message));
      });
  };
};

const fetchMissionRequest = () => {
  return {
    type: Types.FETCH_MISSION_REQUEST,
  };
};

const fetchMissionSuccess = (mission) => {
  return {
    type: Types.FETCH_MISSION_SUCCESS,
    payload: mission,
  };
};

const fetchMissionFailure = (error) => {
  return {
    type: Types.FETCH_MISSION_FAILURE,
    payload: error,
  };
};

export const fetchMission = (missionId) => {
  return (dispatch) => {
    dispatch(fetchMissionRequest());
    axiosMissionInstance({
      url: service.baseUrl + "/mission/SpecificMission/" + missionId,
      method: "get",
    })
      .then((response) => {
        dispatch(fetchMissionSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchMissionFailure(error));
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

export const fetchMissionData = (searchString, type) => {
  return (dispatch) => {
    dispatch(fetchMissionDataRequest());

    const userMissioConfig = {
      url: service.baseUrl + "/mission/UserMissions/" + 0,
      method: "get",
    };
    const allMissionConfig = {
      url: service.baseUrl + "/mission/SearchMission/" + searchString,
      method: "get",
    };
    axios
      .all([
        axiosMissionInstance(
          type === "yourMissions"
            ? userMissioConfig
            : searchString !== ""
            ? allMissionConfig
            : userMissioConfig
        ),
        axiosMissionInstance({
          url: service.baseUrl + "/mission/FavoriteMissions",
          method: "get",
        }),
      ])
      .then((response) => {
        dispatch(fetchMissionDataSuccess(response));
      })
      .catch((error) => {
        dispatch(fetchMissionDataFailure(error.response.data.message));
      });
  };
};

const fetchMarkedMissionsRequest = () => {
  return {
    type: Types.FETCH_MARKED_MISSIONS_REQUEST,
  };
};

const fetchMarkedMissionsSuccess = (missions) => {
  return {
    type: Types.FETCH_MARKED_MISSIONS_SUCCESS,
    payload: missions,
  };
};

const fetchMarkedMissionsFailure = (error) => {
  return {
    type: Types.FETCH_MARKED_MISSIONS_FAILURE,
    payload: error,
  };
};

export const fetchMarkedMissions = () => {
  return (dispatch) => {
    dispatch(fetchMarkedMissionsRequest());
    axiosMissionInstance({
      url: service.baseUrl + "/mission/FavoriteMissions",
      method: "get",
    })
      .then((response) => {
        dispatch(fetchMarkedMissionsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchMarkedMissionsFailure(error.response.data.message));
      });
  };
};

const fetchMissionsBySearchStringRequest = () => {
  return {
    type: Types.FETCH_MISSIONS_BY_SEARCHSTRING_REQUEST,
  };
};

const fetchMissionsBySearchStringSuccess = (missions, searchString) => {
  return {
    type: Types.FETCH_MISSIONS_BY_SEARCHSTRING_SUCCESS,
    payload: [missions, searchString],
  };
};

const fetchMissionsBySearchStringFailure = (error) => {
  return {
    type: Types.FETCH_MISSIONS_BY_SEARCHSTRING_FAILURE,
    payload: error,
  };
};

export const fetchMissionsBySearchString = (searchString) => {
  return (dispatch) => {
    dispatch(fetchMissionsBySearchStringRequest());
    axiosMissionInstance({
      url: service.baseUrl + "/mission/SearchMission/" + searchString,
      method: "get",
    })
      .then((response) => {
        dispatch(
          fetchMissionsBySearchStringSuccess(response.data, searchString)
        );
      })
      .catch((error) => {
        dispatch(fetchMissionsBySearchStringFailure(error.response.data.message));
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

export const markMission = (missionId) => {
  return (dispatch) => {
    dispatch(markMissionRequest());
    axiosMissionInstance({
      url: service.baseUrl + "/mission/FavoriteMission/" + missionId,
      method: "post",
    })
      .then(() => {
        dispatch(markMissionSuccess());
      })
      .catch((error) => {
        dispatch(markMissionFailure(error.response.data.message));
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

export const unmarkMission = (missionId) => {
  return (dispatch) => {
    dispatch(unmarkMissionRequest());
    axiosMissionInstance({
      url: service.baseUrl + "/mission/FavoriteMission/" + missionId,
      method: "delete",
    })
      .then(() => {
        dispatch(unmarkMissionSuccess());
      })
      .catch((error) => {
        dispatch(unmarkMissionFailure(error.response.data.message));
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

export const removeMissionMembership = (missionId) => {
  return (dispatch) => {
    dispatch(removeMissionMembershipRequest());
    axiosMissionInstance({
      url: service.baseUrl + "/mission/MissionMember/" + missionId,
      method: "delete",
    })
      .then(() => {
        dispatch(removeMissionMembershipSuccess());
      })
      .catch((error) => {
        dispatch(removeMissionMembershipFailure(error.response.data.message));
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

export const addMissionMembership = (missionId) => {
  return (dispatch) => {
    dispatch(addMissionMembershipRequest());
    axiosMissionInstance({
      url: service.baseUrl + "/mission/MissionMember/" + missionId,
      method: "post",
    })
      .then(() => {
        dispatch(addMissionMembershipSuccess());
      })
      .catch((error) => {
        dispatch(addMissionMembershipFailure(error.response.data.message));
      });
  };
};

// Request interceptor for API calls
axiosMissionInstance.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
// Response interceptor for API calls
axiosMissionInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  if (typeof(error.response.data.message) === 'undefined'){
    error.response = {data : { message : "Something went terribly wrong."}}
  }
  if (error.response.status === 401) {
    unAuthorize();
    }
    return Promise.reject(error);
  }
);
