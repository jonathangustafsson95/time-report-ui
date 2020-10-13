import * as Types from "../Types/SettingsType";

const initialState = {
  date: new Date(),
};

const registryReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_DATE:
      let date = new Date(state.date.valueOf())
      action.payload === "back" ? date.setDate(date.getDate() - 7) : date.setDate(date.getDate() + 7);     
      return {
        ...state,
        date: date,
      };
    default:
      return state;
  }
};

export default registryReducer;
