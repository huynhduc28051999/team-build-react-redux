import { combineReducers } from "redux"
import authReducer from './auth'
import meReducer from './me'
import groupReducer from "./group"
import userReducer from "./user"
import permissionReducer from "./permission"
import eventReducer from "./event"
import reportReducer from "./report"

const rootReducer = combineReducers({
  auth: authReducer,
  me: meReducer,
  group: groupReducer,
  user: userReducer,
  permission: permissionReducer,
  event: eventReducer,
  report: reportReducer
})
export default rootReducer