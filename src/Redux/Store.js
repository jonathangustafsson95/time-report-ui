import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import registryReducer from "./Reducers/RegistryReducer";
import authReducer from "./Reducers/AuthReducer";
import missionReducer from "./Reducers/MissionReducer";
import settingsReducer from "./Reducers/SettingsReducer";
import statisticReducer from "./Reducers/StatisticReducer";

const rootReducer = combineReducers({
  registryData: registryReducer,
  authData: authReducer,
  missionData: missionReducer,
  settings: settingsReducer,
  statisticData: statisticReducer,
});
const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
