import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./Reducers/UserReducer";
import registryReducer from "./Reducers/RegistryReducer";
import authReducer from "./Reducers/AuthReducer";

const rootReducer = combineReducers({
  userData: userReducer,
  registryData: registryReducer,
  authData: authReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
