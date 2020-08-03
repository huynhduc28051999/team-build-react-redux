import { call, put, takeEvery } from 'redux-saga/effects'
import * as group from '@actions/group'
import * as type from '@constants/actionTypes'
import * as apiUrl from '@constants/apiUrl'
import axiosClient from '@utils/axiosClient'
import { OpenNotification } from '@components/Notification'

function getAllGroup() {
  return axiosClient.get(apiUrl.URL_API_GET_ALL_GROUP)
}
export function* getDataAllGroup() {
  try {
    const response = yield call(getAllGroup)
    const { data } = response
    if (data) {
      yield put(group.getAllGroupSuccess(data))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Lấy dữ liệu group thành công!'
      })
    } else {
      yield put(group.getAllGroupFailed(data))
      OpenNotification({
        type: 'error',
        description: data,
        title: 'Lỗi!'
      })
    }
  } catch (error) {
    yield put(group.getAllGroupFailed(error))
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Lỗi!'
    })
  }
}

function addGroup(fromData) {
  const { data } = fromData.payload
  return axiosClient.post(apiUrl.URL_API_ADD_GROUP, data)
}

export function* addDataGroup(data) {
  try {
    const response = yield call(addGroup, data)
    const { data: dataRes } = response
    if (dataRes) {
      yield put(group.addGroupSuccess(dataRes))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Thêm phòng ban thành công !'
      })
      yield put(group.getAllGroup())
    } else {
      yield put(group.addGroupFail(dataRes))
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
    yield put(group.addGroupFail(error))
  }
}

function getGroupById(fromData) {
  const { data } = fromData.payload
  return axiosClient.get(apiUrl.URL_API_GET_GROUP_ID, {
    params: {
      id: data
    }
  })
}

export function* getDataGroupById(data) {
  try {
    const response = yield call(getGroupById, data)
    const { data: dataRes } = response
    if (dataRes) {
      yield put(group.getGroupByIdSuccess(dataRes))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Lấy dữ liệu phòng ban thành công !'
      })
    } else {
      yield put(group.getGroupByIdFail(dataRes))
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
    yield put(group.getGroupByIdFail(error))
  }
}

function updateGroup(fromData) {
  const { data } = fromData.payload
  return axiosClient.post(apiUrl.URL_API_UPDATE_GROUP, data)
}

export function* updateDataGroup(data) {
  try {
    const response = yield call(updateGroup, data)
    const { data: dataRes } = response
    if (dataRes) {
      yield put(group.updateGroupSuccess(dataRes))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'chỉnh sửa phòng ban thành công !'
      })
      yield put(group.getAllGroup())
    } else {
      yield put(group.updateGroupFail(dataRes))
      OpenNotification({
        type: 'error',
        description: dataRes,
        title: 'Lỗi!'
      })
    }
  } catch (error) {
    yield put(group.updateGroupFail(error))
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Lỗi!'
    })
  }
}

function deleteGroup(fromData) {
  const { data } = fromData.payload
  return axiosClient.post(apiUrl.URL_API_DELETE_GROUP, data)
}

export function* deleteDataGroup(data) {
  try {
    const response = yield call(deleteGroup, data)
    const { data: dataRes } = response
    if (dataRes) {
      yield put(group.deleteGroupSuccess(dataRes))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Xóa phòng ban thành công !'
      })
      yield put(group.getAllGroup())
    } else {
      yield put(group.deleteGroupFail(dataRes))
      OpenNotification({
        type: 'error',
        description: dataRes,
        title: 'Lỗi!'
      })
    }
  } catch (error) {
    yield put(group.deleteGroupFail(error))
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Lỗi!'
    })
  }
}

export function* actionGroup() {
  yield takeEvery(type.GET_ALL_GROUP, getDataAllGroup)
  yield takeEvery(type.ADD_GROUP, addDataGroup)
  yield takeEvery(type.GET_GROUP_ID, getDataGroupById)
  yield takeEvery(type.UPDATE_GROUP, updateDataGroup)
  yield takeEvery(type.DELETE_GROUP, deleteDataGroup)
}