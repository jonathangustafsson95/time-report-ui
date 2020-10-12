import { types } from "util";
import * as Types from "../Types/MissionTypes";

const initialState = {
  loading: false,
  missions: [],
  errorMsg: "",
  error: false,
};

const missionReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case Types.FETCH_USER_MARKED_MISSIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.FETCH_USER_MARKED_MISSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        missions: action.payload,
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
    case Types.MARK_MISSION_REQUEST:
      return{
        ...state,
        loading: true,

      }
    case Types.MARK_MISSION_SUCCESS:
      return{
        ...state,
        loading: false,
        missions: [],
        errorMsg: "",
        error: false,
        
      }
    case Types.MARK_MISSION_FAILURE:
      return{
        ...state,
        loading: false,
        errorMsg: action.payload,
        error: true,
        
      }
    default:
      return state;
  }
};

export default missionReducer;
