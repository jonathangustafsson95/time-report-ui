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

export const fetchUserMissions = (token, taskId) => {
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
        dispatch(fetchUserMissionsFailure(error.response.data.message));
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

export const fetchMissionData = (token, type, searchString) => {
  return (dispatch) => {
    dispatch(fetchMissionDataRequest());

    const userMissioConfig = {
      url: service.baseUrl + "/mission/UserMissions/" + 0,
      method: "get",
    };

    const allMissionConfig = {
      url:
        service.baseUrl +
        "/mission/GetAllMissionsBySearchString/" +
        searchString,
      method: "get",
    };

    axios
      .all([
        axios(
          type === "yourProjects"
            ? userMissioConfig
            : searchString !== ""
            ? allMissionConfig
            : userMissioConfig
        ),
        axios({
          url: service.baseUrl + "/mission/GetFavoriteMissions",
          method: "get",
        }),
      ])
      .then((response) => {
        dispatch(fetchMissionDataSuccess(response));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchMissionDataFailure(error.response.data.message));
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

export const fetchMissionsBySearchString = (searchString, token) => {
  return (dispatch) => {
    dispatch(fetchMissionsBySearchStringRequest());
    axios({ 
      url:
        service.baseUrl +
        "/mission/GetAllMissionsBySearchString/" +
        searchString,
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

const markMissionSuccess = (type) => {
  return {
    type: Types.MARK_MISSION_SUCCESS,
    payload: type,
  };
};

const markMissionFailure = (error) => {
  return {
    type: Types.MARK_MISSION_FAILURE,
    payload: error,
  };
};

export const markMission = (favoriteMission, token, type) => {
  return (dispatch) => {
    dispatch(markMissionRequest());
    axios({
      url: service.baseUrl + "/mission/AddFavoriteMission",
      method: "post",
      data: favoriteMission,
    })
      .then(() => {
        dispatch(markMissionSuccess(type));
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

const unmarkMissionSuccess = (type) => {
  return {
    type: Types.UNMARK_MISSION_SUCCESS,
    payload: type
  };
};

const unmarkMissionFailure = (error) => {
  return {
    type: Types.UNMARK_MISSION_FAILURE,
    payload: error,
  };
};

export const unmarkMission = (favoriteMission, token, type) => {
  return (dispatch) => {
    dispatch(unmarkMissionRequest());
    axios({
      url: service.baseUrl + "/mission/FavoriteMission",
      method: "delete",
      data: favoriteMission,
    })
      .then(() => {
        dispatch(unmarkMissionSuccess(type));
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

const removeMissionMembershipSuccess = (type) => {
  return {
    type: Types.REMOVE_MISSION_MEMBERSHIP_SUCCESS,
    payload: type,
  };
};

const removeMissionMembershipFailure = (error) => {
  return {
    type: Types.REMOVE_MISSION_MEMBERSHIP_FAILURE,
    payload: error,
  };
};

export const removeMissionMembership = (token, userId, missionId, type) => {
  return (dispatch) => {
    dispatch(removeMissionMembershipRequest());
    axios({
      url:
        service.baseUrl +
        "/mission/DeleteMissionMember/" +
        userId +
        "/" +
        missionId,
      method: "delete",
    })
      .then(() => {
        dispatch(removeMissionMembershipSuccess(type));
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

const addMissionMembershipSuccess = (type) => {
  return {
    type: Types.ADD_MISSION_MEMBERSHIP_SUCCESS,
    payload: type,
  };
};

const addMissionMembershipFailure = (error) => {
  return {
    type: Types.ADD_MISSION_MEMBERSHIP_FAILURE,
    payload: error,
  };
};

export const addMissionMembership = (token, _missionMember, type) => {
  return (dispatch) => {
    dispatch(addMissionMembershipRequest());
    axios({
      url: service.baseUrl + "/mission/AddMissionMember",
      method: "post",
      data: _missionMember,
    })
      .then(() => {
        dispatch(addMissionMembershipSuccess(type));
      })
      .catch((error) => {
        dispatch(addMissionMembershipFailure(error.response.data.message));
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

export const fetchMission = (token, missionId) => {
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
        dispatch(fetchMissionFailure(error.response.data.message));
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
  if (typeof(error.response.data.message) === 'undefined'){
    error.response.data.message = "Something went terribly wrong."
  }
  if (error.response.status === 401) {
    unAuthorize();
  }
  return Promise.reject(error);
});