import { all } from 'redux-saga/effects'
import { actionAuth } from './auth'
import { actionMe } from './me'
import { actionGroup } from './group'
import { actionUser } from './user'
export default function* rootSaga() {
  yield all([
    actionAuth(),
    actionMe(),
    actionGroup(),
    actionUser()
  ])
}