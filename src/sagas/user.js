import { call, put, takeEvery } from 'redux-saga/effects'
import * as user from '@actions/user'
import * as type from '@constants/actionTypes'
import * as apiUrl from '@constants/apiUrl'
import axiosClient from '@utils/axiosClient'
import { OpenNotification } from '@components/Notification'

function getAllUser() {
  return axiosClient.get(apiUrl.URL_API_GET_ALL_USER)
}
export function* getDataAllUser() {
  try {
    const response = yield call(getAllUser)
    const { data } = response
    if (data) {
      yield put(user.getAllUserSucces(data))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Lấy dữ liệu nhân viên thành công!'
      })
    } else {
      yield put(user.getAllUserFail(data))
      OpenNotification({
        type: 'error',
        description: data,
        title: 'Lỗi!'
      })
    }
  } catch (error) {
    yield put(user.getAllUserFail(error))
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Lỗi!'
    })
  }
}

export function* actionUser() {
  yield takeEvery(type.GET_ALL_USER, getDataAllUser)
}