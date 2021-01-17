import { combineReducers } from "redux"
import authReducer from './auth'
import meReducer from './me'
import groupReducer from "./group"
import userReducer from "./user"
import permissionReducer from "./permission"
import eventReducer from "./event"

const rootReducer = combineReducers({
  auth: authReducer,
  me: meReducer,
  group: groupReducer,
  user: userReducer,
  permission: permissionReducer,
  event: eventReducer
})
export default rootReducer