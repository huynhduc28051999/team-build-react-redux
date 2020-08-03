import { combineReducers } from "redux"
import authReducer from './auth'
import meReducer from './me'
import groupReducer from "./group"

const rootReducer = combineReducers({
  auth: authReducer,
  me: meReducer,
  group: groupReducer
})
export default rootReducer