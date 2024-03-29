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


function addUser(fromData) {
  const { data } = fromData.payload
  return axiosClient.post(apiUrl.URL_API_ADD_USER, data)
}

export function* addDataUser(data) {
  try {
    const response = yield call(addUser, data)
    const { data: dataRes } = response
    if (dataRes) {
      yield put(user.addUserSuccess(dataRes))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Thêm nhân viên thành công !'
      })
      yield put(user.getAllUser())
    } else {
      yield put(user.addUserFail(dataRes))
      OpenNotification({
        type: 'error',
        description: dataRes,
        title: 'Lỗi!'
      })
    }
  } catch (error) {
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Lỗi!'
    })
    yield put(user.addUserFail(error))
  }
}


function getUserById(fromData) {
  const { data } = fromData.payload
  console.log(data)
  return axiosClient.get(apiUrl.URL_API_GET_USER_ID, {
    params: {
      id: data
    }
  })
}

export function* getDataUserById(data) {
  try {
    const response = yield call(getUserById, data)
    const { data: dataRes } = response
    if (dataRes) {
      yield put(user.getUserByIdSuccess(dataRes))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Lấy dữ liệu nhân viên thành công !'
      })
    } else {
      yield put(user.getUserByIdFail(dataRes))
      OpenNotification({
        type: 'error',
        description: dataRes,
        title: 'Lỗi!'
      })
    }
  } catch (error) {
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Lỗi!'
    })
    yield put(user.getUserByIdFail(error))
  }
}


function updateUser(fromData) {
  const { data } = fromData.payload
  return axiosClient.put(apiUrl.URL_API_UPDATE_USER, data)
}

export function* updateDataUser(data) {
  try {
    const response = yield call(updateUser, data)
    const { data: dataRes } = response
    if (dataRes) {
      yield put(user.updateUserSuccess(dataRes))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'chỉnh sửa nhân viên thành công !'
      })
      yield put(user.getAllUser())
    } else {
      yield put(user.updateUserFail(dataRes))
      OpenNotification({
        type: 'error',
        description: dataRes,
        title: 'Lỗi!'
      })
    }
  } catch (error) {
    yield put(user.updateUserFail(error))
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Lỗi!'
    })
  }
}

function deleteUser(fromData) {
  const { data } = fromData.payload
  return axiosClient.post(apiUrl.URL_API_DELETE_USER, data)
}

export function* deleteDataUser(data) {
  try {
    const response = yield call(deleteUser, data)
    const { data: dataRes } = response
    if (dataRes) {
      yield put(user.deleteUserSuccess(dataRes))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Xóa nhân viên thành công !'
      })
      yield put(user.getAllUser())
    } else {
      yield put(user.deleteUserFail(dataRes))
      OpenNotification({
        type: 'error',
        description: dataRes,
        title: 'Lỗi!'
      })
    }
  } catch (error) {
    yield put(user.deleteUserFail(error))
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Lỗi!'
    })
  }
}

export function* actionUser() {
  yield takeEvery(type.GET_ALL_USER, getDataAllUser)
  yield takeEvery(type.ADD_USER, addDataUser)
  yield takeEvery(type.GET_USER_ID, getDataUserById)
  yield takeEvery(type.UPDATE_USER, updateDataUser)
  yield takeEvery(type.DELETE_USER, deleteDataUser)
}