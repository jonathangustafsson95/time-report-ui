import * as Types from "../Types/MissionTypes";

const initialState = {
  loading: false,
  missions: [],
  errorMsg: "",
  error: false,
};

const mission = [
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
];

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
