import * as Types from "../Types/MissionTypes";
import axios from "axios";
import * as service from "../ApiService/Service";
import {unAuthorize} from './AuthActions'

// LOCAL actions

export const resetMissionsFromStore = () => {
  return {
    type: Types.RESET_MISSIONS_FROM_STORE,
  };
};

export const filterMissionsBySearchstring = (searchString) => {
  return {
    type: Types.FILTER_MISSIONS_BY_SEARCHSTRING,
    payload: searchString,
  }
}

export const changeCurrentTableType = (type) => {
  return {
    type: Types.CHANGE_CURRENT_TABLE_TYPE,
    payload: type,
  }
}

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
  console.log(taskId);
  return (dispatch) => {
    dispatch(fetchUserMissionsRequest());
    axios({
      url: service.baseUrl + "/mission/UserMissions/" + taskId,
      method: "get",
    })
      .then((response) => {
        dispatch(fetchUserMissionsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchUserMissionsFailure(error.message));
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
    axios({
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
      url:
        service.baseUrl +
        "/mission/SearchMission/" +
        searchString,
      method: "get",
    };

    axios
      .all([
        axios(
          type === "yourMissions"
            ? userMissioConfig
            : searchString !== ""
            ? allMissionConfig
            : userMissioConfig
        ),
        axios({
          url: service.baseUrl + "/mission/FavoriteMissions",
          method: "get",
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
    axios({ 
      url:
        service.baseUrl +
        "/mission/SearchMission/" +
        searchString,
      method: "get",
    })
      .then((response) => {
        dispatch(
          fetchMissionsBySearchStringSuccess(response.data, searchString)
        );
      })
      .catch((error) => {
        dispatch(fetchMissionsBySearchStringFailure(error));
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

export const markMission = (favoriteMission) => {
  return (dispatch) => {
    dispatch(markMissionRequest());
    axios({
      url: service.baseUrl + "/mission/FavoriteMission",
      method: "post",
      data: favoriteMission
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

export const unmarkMission = (favoriteMission) => {
  return (dispatch) => {
    dispatch(unmarkMissionRequest());
    axios({
      url: service.baseUrl + "/mission/FavoriteMission",
      method: "delete",
      data: favoriteMission,
    })
      .then(() => {
        dispatch(unmarkMissionSuccess());
      })
      .catch((error) => {
        dispatch(unmarkMissionFailure(error.message));
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

export const removeMissionMembership = (userId, missionId) => {
  return (dispatch) => {
    dispatch(removeMissionMembershipRequest());
    axios({
      url:
        service.baseUrl +
        "/mission/MissionMember/" +
        userId +
        "/" +
        missionId,
      method: "delete",
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

export const addMissionMembership = (_missionMember) => {
  return (dispatch) => {
    dispatch(addMissionMembershipRequest());
    axios({
      url: service.baseUrl + "/mission/MissionMember",
      method: "post",
      data: _missionMember,
    })
      .then(() => {
        dispatch(addMissionMembershipSuccess());
      })
      .catch((error) => {
        dispatch(addMissionMembershipFailure(error.message));
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