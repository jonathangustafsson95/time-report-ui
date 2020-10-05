import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import registryReducer from "./Reducers/RegistryReducer";
import authReducer from "./Reducers/AuthReducer";
import missionReducer from "./Reducers/MissionReducer";

const rootReducer = combineReducers({
  registryData: registryReducer,
  authData: authReducer,
  missionData: missionReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
