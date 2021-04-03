import { call, put, takeEvery } from 'redux-saga/effects'
import * as me from '@actions/me'
import * as actionChangePass from '@actions/changePassword'
import * as type from '@constants/actionTypes'
import * as apiUrl from '@constants/apiUrl'
import axiosClient from '@utils/axiosClient'
import { OpenNotification } from '@components/Notification'

function getProfile() {
  return axiosClient.get(apiUrl.URL_API_PROFILE)
}
export function* getProfileUser() {
  try {
    const response = yield call(getProfile)
    const { data } = response
    if (data) {
      yield put(me.meContructionSucces(data))
    } else {
      yield put(me.meContructionFail(data))
      OpenNotification({
        type: 'error',
        description: data,
        title: 'Lỗi'
      })
    }
  } catch (error) {
    yield put(me.meContructionFail(error))
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Lỗi'
    })
  }
}

function changePassword(fromData) {
  const { currentPassword, newPassword } = fromData.payload.data
  return axiosClient.post(apiUrl.URL_API_CHANGE_PASSWORD, { currentPassword, newPassword })
}

export function* changePasswordUser(data) {
  try {
    const response = yield call(changePassword, data)
    const { data: dataResp } = response
    if (dataResp) {
      yield put(actionChangePass.changePasswordSuccess(dataResp))
      OpenNotification({
        type: 'success',
        description: 'Thay đổi password thành công',
        title: 'Thành công'
      })
    } else {
      yield put(actionChangePass.changePasswordFailed(dataResp))
      OpenNotification({
        type: 'error',
        description: dataResp,
        title: 'Lỗi'
      })
    }
  } catch (error) {
    yield put(actionChangePass.changePasswordFailed(error))
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Lỗi'
    })
  }
}

function changeProfile(fromData) {
  const { data: input } = fromData.payload
  return axiosClient.post(apiUrl.URL_API_CHANGE_PROFILE, input)
}

export function* changeProfileUser(data) {
  try {
    const response = yield call(changeProfile, data)
    const { data: dataResp } = response
    if (dataResp) {
      yield put(me.changeProfileSucces(dataResp))
      OpenNotification({
        type: 'success',
        description: 'Thay đổi thông tin cá nhân thành công',
        title: 'Thành công'
      })
    } else {
      yield put(me.changeProfileFail(dataResp))
      OpenNotification({
        type: 'error',
        description: dataResp,
        title: 'Lỗi'
      })
    }
  } catch (error) {
    yield put(me.changeProfileFail(error))
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Lỗi'
    })
  }
}

function notifications() {
  return axiosClient.get(apiUrl.URL_API_NOTIFICATION)
}

export function* notificationsUser() {
  try {
    const response = yield call(notifications)
    const { data: dataResp } = response
    if (dataResp) {
      yield put(me.notificationsSucces(dataResp))
    } else {
      yield put(me.notificationsFail(dataResp))
      OpenNotification({
        type: 'error',
        description: dataResp,
        title: 'Lỗi'
      })
    }
  } catch (error) {
    yield put(me.notificationsFail(error))
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Lỗi'
    })
  }
}
export function* actionMe() {
  yield takeEvery(type.ME_CONSTRUCTION, getProfileUser)
  yield takeEvery(type.CHANGE_PASSWORD, changePasswordUser)
  yield takeEvery(type.CHANGE_PROFILE, changeProfileUser)
  yield takeEvery(type.NOTIFICATION, notificationsUser)
}