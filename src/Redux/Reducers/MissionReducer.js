import * as Types from "../Types/MissionTypes";

const initialState = {
  loading: false,
  missions: [
    {
      Name: "mission1",
      Description: "asdasd",
      Customer: "DHL",
      Tasks: [
        {
          Name: "task1",
        },
        {
          Name: "task2",
        },
      ],
    },
    {
      Name: "mission2",
      Description: "asdasd",
      Customer: "IKEA",
      Tasks: [
        {
          Name: "task1",
        },
        {
          Name: "task2",
        },
      ],
    },
  ],
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

    default:
      return state;
  }
};

export default missionReducer;
