import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./Reducers/UserReducer";
import taskReducer from "./Reducers/TaskReducer";

const rootReducer = combineReducers({
  userData: userReducer,
  taskData: taskReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
