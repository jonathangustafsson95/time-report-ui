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

export const markMissionRequest = () => {
  return {
    type: Types.MARK_MISSION_REQUEST,
  };
};

export const markMissionSuccess = (missions) => {
  return {
    type: Types.MARK_MISSION_SUCCESS,
    payload: missions,
  };
};

export const markMissionFailure = (error) => {
  return {
    type: Types.MARK_MISSION_FAILURE,
    payload: error,
  };
};

export const unmarkMissionRequest = () => {
  return {
    type: Types.UNMARK_MISSION_REQUEST,
  };
};

export const unmarkMissionSuccess = (missions) => {
  return {
    type: Types.UNMARK_MISSION_SUCCESS,
    payload: missions,
  };
};

export const unmarkMissionFailure = (error) => {
  return {
    type: Types.UNMARK_MISSION_FAILURE,
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
  return (dispatch) => {
    dispatch(fetchMissionsBySearchStringRequest());
    axios({
      url: service.baseUrl + "/mission/GetAllMissionsBySearchString/" + searchString,
      method: "get",
      header: {
        Authorization: "Bearer " + token
      }
    })
      .then((response) => {
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
// export const markMission = (favoriteMissionsToPost, token) => {
//   return (dispatch) => {
//     const postPayload = {
//       favoriteMissionsToPost: favoriteMissionsToPost
//     };
   
//     dispatch(unmarkMissionRequest());
//         axios({
//           url: service.baseUrl + "/mission/AddFavoriteMission",
//           method: "post",
//           data: postPayload,
//           headers: { Authorization: "Bearer " + token },
//         })
//       .then(() => {
//         dispatch(markMission());
//       })
//       .catch((error) => {
//         dispatch(markMission(error.message));
//       });
//   };
// };
// export const unmarkMission = (favoriteMissionsToDelete, token) => {
//   return (dispatch) => {
//     const deletePayload = {
//       favoriteMissionsToDelete: favoriteMissionsToDelete
//     };
   
//     dispatch(unmarkMissionRequest());
//         axios({
//           url: service.baseUrl + "/mission/FavoriteMission",
//           method: "delete",
//           data: deletePayload,
//           headers: { Authorization: "Bearer " + token },
//         })
//       .then(() => {
//         dispatch(unmarkMission());
//       })
//       .catch((error) => {
//         dispatch(unmarkMission(error.message));
//       });
//   };
// };

