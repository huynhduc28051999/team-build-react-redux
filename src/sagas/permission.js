import { call, put, takeEvery } from 'redux-saga/effects'
import * as permission from '@actions/permission'
import * as type from '@constants/actionTypes'
import * as apiUrl from '@constants/apiUrl'
import axiosClient from '@utils/axiosClient'
import { OpenNotification } from '@components/Notification'

function getAllPermission() {
  return axiosClient.get(apiUrl.URL_API_GET_PERMISSION)
}
export function* getDataAllPermission() {
  try {
    const response = yield call(getAllPermission)
    const { data } = response
    if (data) {
      yield put(permission.getAllPermissonSucces(data))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Lấy dữ liệu quyền thành công!'
      })
    } else {
      yield put(permission.getAllPermissonFail(data))
      OpenNotification({
        type: 'error',
        description: data,
        title: 'Lỗi!'
      })
    }
  } catch (error) {
    yield put(permission.getAllPermissonFail(error))
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Lỗi!'
    })
  }
}

export function* actionPermission() {
  yield takeEvery(type.PERMISSION, getDataAllPermission)
}