import * as Types from "../Types/SettingsType";

const initialState = {
  date: new Date(),
};

const registryReducer = (state = initialState, action) => {
  let date = new Date(state.date.valueOf())
  switch (action.type) {
    case Types.SET_DATE:
      action.payload === "back" ? date.setDate(date.getDate() - 7) : date.setDate(date.getDate() + 7);     
      return {
        ...state,
        date: date,
      };
    case Types.SET_DATE_MOBILE:
      action.payload === "back" ? date.setDate(date.getDate() - 1) : date.setDate(date.getDate() + 1);     
      return {
        ...state,
        date: date,
      };
    default:
      return state;
  }
};

export default registryReducer;
