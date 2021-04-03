import { call, put, takeEvery } from 'redux-saga/effects'
import * as auth from '@actions/auth'
import * as type from '@constants/actionTypes'
import * as apiUrl from '@constants/apiUrl'
import axiosClient from '@utils/axiosClient'
import { OpenNotification } from '@components/Notification'

function postLoginUser(fromData) {
  const { email, password } = fromData.payload.data
  return axiosClient.post(apiUrl.URL_API_LOGIN, { email, password })
}
export function* loginUser(dataBody) {
  try {
    const response = yield call(postLoginUser, dataBody)
    const { data } = response
    if (data && data.token) {
      const { token } = data
      localStorage.setItem("access-token", token)
      yield put(auth.loginContructionSuccess(data))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Đăng nhập thành công!'
      })
    } else {
      yield put(auth.loginContructionFailed(data))
      OpenNotification({
        type: 'error',
        description: data,
        title: 'Đăng nhập thất bại!'
      })
    }
  } catch (error) {
    yield put(auth.loginContructionFailed(error))
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Đăng nhập thất bại!'
    })
  }
}

export function* actionAuth() {
  yield takeEvery(type.LOGIN_CONSTRUCTION, loginUser)
}