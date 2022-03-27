import { combineReducers } from "redux";
import userReducer from './userReducer'
import promiseReducer from "./promiseReducer";
import fbReducer from './fbReducer'


const rootReducer = combineReducers({
    userState: userReducer,
    promiseState: promiseReducer,
    fbState: fbReducer, 
   
});

export default rootReducer;