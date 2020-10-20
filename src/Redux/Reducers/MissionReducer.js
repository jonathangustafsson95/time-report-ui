import * as Types from "../Types/MissionTypes";

const initialState = {
  loading: false,
  missions: [],
  markedMissions: [],
  mission: null,
  errorMsg: "",
  error: false,
  isMissionStatusUpdated: false,
  updatedFrom: "yourProjects",
  searchString: "",
};

const missionReducer = (state = initialState, action) => {
  switch (action.type) {
    // Local reducers
    case Types.RESET_MISSIONS_FROM_STORE:
      return {
        ...state,
        missions: [],
      };

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

    case Types.FETCH_MISSIONS_BY_SEARCHSTRING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.FETCH_MISSIONS_BY_SEARCHSTRING_SUCCESS:
      return {
        ...state,
        loading: false,
        missions: action.payload[0],
        errorMsg: "",
        error: false,
        searchString: action.payload[1],
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
        isMissionStatusUpdated: false,
      };
    case Types.MARK_MISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: "",
        error: false,
        isMissionStatusUpdated: true,
        updatedFrom: action.payload,
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
        isMissionStatusUpdated: false,
      };
    case Types.UNMARK_MISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: "",
        error: false,
        isMissionStatusUpdated: true,
        updatedFrom: action.payload,
      };
    case Types.UNMARK_MISSION_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
        error: true,
      };
    case Types.REMOVE_MISSION_MEMBERSHIP_REQUEST:
      return {
        ...state,
        loading: true,
        isMissionStatusUpdated: false,
      };
    case Types.REMOVE_MISSION_MEMBERSHIP_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: "",
        error: false,
        isMissionStatusUpdated: true,
        updatedFrom: action.payload,
      };
    case Types.REMOVE_MISSION_MEMBERSHIP_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
        error: true,
      };
    case Types.ADD_MISSION_MEMBERSHIP_REQUEST:
      return {
        ...state,
        loading: true,
        isMissionStatusUpdated: false,
      };
    case Types.ADD_MISSION_MEMBERSHIP_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: "",
        error: false,
        isMissionStatusUpdated: true,      
        updatedFrom: action.payload,
      };
    case Types.ADD_MISSION_MEMBERSHIP_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
        error: true,
      };
    case Types.FETCH_MISSION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.FETCH_MISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        mission: action.payload,
        errorMsg: "",
        error: false,
      };
    case Types.FETCH_MISSION_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
        mission: null,
        error: true,
      };

    default:
      return state;
  }
};

export default missionReducer;
