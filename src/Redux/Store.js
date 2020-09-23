import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';
import userReducer from "./Reducers/UserReducer";

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
