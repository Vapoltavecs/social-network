import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { AuthReducer } from "./reducers/authReducer";

const rootReducer = combineReducers({ auth: AuthReducer });

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware()
    // other store enhancers if any
  )
);
