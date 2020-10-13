import * as Types from "../Types/MissionTypes";

const initialState = {
  loading: false,
  missions: [],
  markedMissions: [],
  errorMsg: "",
  error: false,
  isMissionStatusUpdated: false,
  foundMissions: [],
};

const missionReducer = (state = initialState, action) => {
  switch (action.type) {
    // Local reducers
    case Types.RESET_MISSIONS_FROM_STORE:
      return {
        ...state,
        missions: [],
      }

    // API reducers
    case Types.FETCH_USER_MISSIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.FETCH_USER_MISSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        missions: action.payload,
        errorMsg: "",
        error: false,
      };
    case Types.FETCH_USER_MISSIONS_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
        error: true,
      };
    case Types.FETCH_MISSION_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        isMissionStatusUpdated: false,
      };
    case Types.FETCH_MISSION_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        missions: action.payload[0].data,
        markedMissions: action.payload[1].data,
        errorMsg: "",
        error: false,
      };
    case Types.FETCH_MISSION_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        missions: [],
        markedMissions: [],
        errorMsg: action.payload,
        error: true,
      };
    case Types.FETCH_USER_MARKED_MISSIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.FETCH_USER_MARKED_MISSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        markedMissions: action.payload,
        errorMsg: "",
        error: false,
      };
    case Types.FETCH_USER_MARKED_MISSIONS_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
        error: true,
      };

    case Types.FETCH_MISSIONS_BY_SEARCHSTRING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.FETCH_MISSIONS_BY_SEARCHSTRING_SUCCESS:
      return {
        ...state,
        loading: false,
        missions: action.payload,
        errorMsg: "",
        error: false,
      };
    case Types.FETCH_MISSIONS_BY_SEARCHSTRING_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
        error: true,
      };
    case Types.MARK_MISSION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.MARK_MISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: "",
        error: false,
        isMissionStatusUpdated: true,
      };
    case Types.MARK_MISSION_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
        error: true,
      };
    case Types.UNMARK_MISSION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.UNMARK_MISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: "",
        error: false,
        isMissionStatusUpdated: true,
      };
    case Types.UNMARK_MISSION_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
        error: true,
      };
    default:
      return state;
  }
};

export default missionReducer;
