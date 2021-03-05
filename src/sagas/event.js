import { call, put, takeEvery } from 'redux-saga/effects'
import * as event from '@actions/event'
import * as type from '@constants/actionTypes'
import * as apiUrl from '@constants/apiUrl'
import axiosClient from '@utils/axiosClient'
import { OpenNotification } from '@components/Notification'

function getAllEvent() {
  return axiosClient.get(apiUrl.URL_API_GET_ALL_EVENT)
}
export function* getDataAllEvent() {
  try {
    const response = yield call(getAllEvent)
    const { data } = response
    if (data) {
      yield put(event.getAllEventSuccess(data))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Lấy dữ liệu sự kiện thành công!'
      })
    } else {
      yield put(event.getAllEventFailed(data))
      OpenNotification({
        type: 'error',
        description: data,
        title: 'Lỗi!'
      })
    }
  } catch (error) {
    yield put(event.getAllEventFailed(error))
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Lỗi!'
    })
  }
}

function getEventByRangeDate(fromData) {
  const { startDate, endDate } = fromData.payload
  return axiosClient.get(apiUrl.URL_API_GET_EVENT_BY_RANGE_DATE, {
    params: {
      startDate,
      endDate
    }
  })
}
export function* getDataByRangeDate(fromData) {
  try {
    const response = yield call(getEventByRangeDate, fromData)
    const { data } = response
    if (data) {
      yield put(event.getAllEventSuccess(data))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Lấy dữ liệu sự kiện thành công!'
      })
    } else {
      yield put(event.getAllEventFailed(data))
      OpenNotification({
        type: 'error',
        description: data,
        title: 'Lỗi!'
      })
    }
  } catch (error) {
    yield put(event.getAllEventFailed(error))
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Lỗi!'
    })
  }
}

function addEvent(fromData) {
  const { input } = fromData.payload
  return axiosClient.post(apiUrl.URL_API_ADD_EVENT, input)
}
export function* addDataEvent(data) {
  try {
    const response = yield call(addEvent, data)
    const { data: dataRes } = response
    if (dataRes) {
      yield put(event.addEventSucces(dataRes))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Thêm sự kiện thành công !'
      })
      yield put(event.getAllEvent())
    } else {
      yield put(event.addEventFail(dataRes))
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
    yield put(event.addEventFail(error))
  }
}

function getEventHistory(fromData) {
  const { idEvent } = fromData.payload
  return axiosClient.get(apiUrl.URL_API_GET_EVENT_HISTORY, {
    params: { idEvent }
  })
}
export function* getDataEventHistory(fromData) {
  try {
    const response = yield call(getEventHistory, fromData)
    const { data } = response
    if (data) {
      yield put(event.getEventHistorySuccess(data))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Lấy dữ liệu lịch sử thành công!'
      })
    } else {
      yield put(event.getEventHistoryFailed(data))
      OpenNotification({
        type: 'error',
        description: data,
        title: 'Lỗi!'
      })
    }
  } catch (error) {
    yield put(event.getEventHistoryFailed(error))
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Lỗi!'
    })
  }
}

function updateEvent(fromData) {
  const { _id, input } = fromData.payload
  return axiosClient.put(apiUrl.URL_API_UPDATE_EVENT, { _id, input })
}
export function* updateDataEvent(data) {
  try {
    const response = yield call(updateEvent, data)
    const { data: dataRes } = response
    if (dataRes) {
      yield put(event.getAllEvent())
      yield put(event.updateEventSucces(dataRes))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Chỉnh sửa sự kiện thành công !'
      })
    } else {
      yield put(event.updateEventFail(dataRes))
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
    yield put(event.updateEventFail(error))
  }
}

function deleteEvent(fromData) {
  const { ids } = fromData.payload
  return axiosClient.post(apiUrl.URL_API_DELETE_EVENT, { ids })
}
export function* deleteDataEvent(data) {
  try {
    const response = yield call(deleteEvent, data)
    const { data: dataRes } = response
    if (dataRes) {
      yield put(event.getAllEvent())
      yield put(event.deleteEventSucces(dataRes))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Xóa sự kiện thành công !'
      })
    } else {
      yield put(event.deleteEventFail(dataRes))
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
    yield put(event.deleteEventFail(error))
  }
}

function completeEvent(fromData) {
  const { _id } = fromData.payload
  return axiosClient.post(apiUrl.URL_API_COMPLETE_EVENT, { _id })
}
export function* completeDataEvent(data) {
  try {
    const response = yield call(completeEvent, data)
    const { data: dataRes } = response
    if (dataRes) {
      yield put(event.getAllEvent())
      yield put(event.completeEventSucces(dataRes))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Thay đổi trạng thái sự kiện thành công !'
      })
    } else {
      yield put(event.completeEventFail(dataRes))
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
    yield put(event.completeEventFail(error))
  }
}

function cancelEvent(fromData) {
  const { _id } = fromData.payload
  return axiosClient.post(apiUrl.URL_API_CANCEL_EVENT, { _id })
}
export function* cancelDataEvent(data) {
  try {
    const response = yield call(cancelEvent, data)
    const { data: dataRes } = response
    if (dataRes) {
      yield put(event.getAllEvent())
      yield put(event.cancelEventSucces(dataRes))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Thay đổi trạng thái sự kiện thành công !'
      })
    } else {
      yield put(event.cancelEventFail(dataRes))
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
    yield put(event.cancelEventFail(error))
  }
}
function reopenEvent(fromData) {
  const { _id } = fromData.payload
  return axiosClient.post(apiUrl.URL_API_REOPEN_EVENT, { _id })
}
export function* reopenDataEvent(data) {
  try {
    const response = yield call(reopenEvent, data)
    const { data: dataRes } = response
    if (dataRes) {
      yield put(event.getAllEvent())
      yield put(event.reopenEventSucces(dataRes))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Thay đổi trạng thái sự kiện thành công !'
      })
    } else {
      yield put(event.reopenEventFail(dataRes))
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
    yield put(event.reopenEventFail(error))
  }
}

function searchEvent(fromData) {
  const { searchBy, keywords } = fromData.payload
  return axiosClient.get(apiUrl.URL_API_SEARCH_EVENT, {
    params: {
      searchBy,
      keywords
    }
  })
}

export function* searchDataEvent(data) {
  try {
    const response = yield call(searchEvent, data)
    const { data: dataRes } = response
    if (dataRes) {
      yield put(event.searchEventSuccess(dataRes))
    } else {
      yield put(event.searchEventFail(dataRes))
      OpenNotification({
        type: 'error',
        description: dataRes,
        title: 'Lỗi!'
      })
    }
  } catch (error) {
    yield put(event.searchEventFail(error))
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Lỗi!'
    })
  }
}

function getUserByEvent(fromData) {
  const { idEvent } = fromData.payload
  return axiosClient.get(apiUrl.URL_API_USER_BY_EVENT, {
    params: { idEvent }
  })
}

export function* getDataUserByEvent(data) {
  try {
    const response = yield call(getUserByEvent, data)
    const { data: dataRes } = response
    if (dataRes) {
      yield put(event.getUserByEventSuccess(dataRes))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Lấy danh sách thành công !'
      })
    } else {
      yield put(event.getUserByEventFail(dataRes))
      OpenNotification({
        type: 'error',
        description: dataRes,
        title: 'Lỗi!'
      })
    }
  } catch (error) {
    yield put(event.getUserByEventFail(error))
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Lỗi!'
    })
  }
}

function approveUserToEvent(fromData) {
  const { idUser, idEvent } = fromData.payload
  return axiosClient.post(apiUrl.URL_API_APPROVE_USER_TO_EVENT, { idEvent, idUser })
}

export function* approveDataUserToEvent(data) {
  try {
    const response = yield call(approveUserToEvent, data)
    const { data: dataRes } = response
    if (dataRes) {
      yield put(event.getUserByEvent({ idEvent: dataRes.idEvent }))
      yield put(event.approveUserToEventSuccess(dataRes))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Duyệt thêm nhân viên vào sự kiện thành công !'
      })
    } else {
      yield put(event.approveUserToEventFail(dataRes))
      OpenNotification({
        type: 'error',
        description: dataRes,
        title: 'Lỗi!'
      })
    }
  } catch (error) {
    yield put(event.approveUserToEventFail(error))
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Lỗi!'
    })
  }
}

function removeUserFromEvent(fromData) {
  const { idUser, idEvent } = fromData.payload
  return axiosClient.post(apiUrl.URL_API_REMOVE_USER_FROM_EVENT, { _id: idEvent, idUser })
}

export function* removeDataUserFromEvent(data) {
  try {
    const response = yield call(removeUserFromEvent, data)
    const { data: dataRes } = response
    if (dataRes) {
      yield put(event.getUserByEvent({ idEvent: dataRes.idEvent }))
      yield put(event.removeUserFromEventSuccess(dataRes))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Xóa nhân viên khỏi sự kiện thành công !'
      })
    } else {
      yield put(event.removeUserFromEventFail(dataRes))
      OpenNotification({
        type: 'error',
        description: dataRes,
        title: 'Lỗi!'
      })
    }
  } catch (error) {
    yield put(event.removeUserFromEventFail(error))
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Lỗi!'
    })
  }
}

function addUserToEvent(fromData) {
  const { idUser, idEvent } = fromData.payload
  return axiosClient.post(apiUrl.URL_API_ADD_USER_TO_EVENT, { _id: idEvent, idUser })
}

export function* addDataUserToEvent(data) {
  try {
    const response = yield call(addUserToEvent, data)
    const { data: dataRes } = response
    if (dataRes) {
      yield put(event.getUserByEvent({ idEvent: dataRes.idEvent }))
      yield put(event.addUserToEventSuccess(dataRes))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Duyệt thêm nhân viên vào sự kiện thành công !'
      })
    } else {
      yield put(event.addUserToEventFail(dataRes))
      OpenNotification({
        type: 'error',
        description: dataRes,
        title: 'Lỗi!'
      })
    }
  } catch (error) {
    yield put(event.addUserToEventFail(error))
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Lỗi!'
    })
  }
}

function cancelUserRequest(fromData) {
  const { idUser, idEvent } = fromData.payload
  return axiosClient.post(apiUrl.URL_API_CANCEL_USER_REQUEST, { _id: idEvent, idUser })
}

export function* cancelDataUserRequest(data) {
  try {
    const response = yield call(cancelUserRequest, data)
    const { data: dataRes } = response
    if (dataRes) {
      yield put(event.getUserByEvent({ idEvent: dataRes.idEvent }))
      yield put(event.cancelUserRequestSuccess(dataRes))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Hủy yêu cầu tham gia sự kiện thành công !'
      })
    } else {
      yield put(event.cancelUserRequestFail(dataRes))
      OpenNotification({
        type: 'error',
        description: dataRes,
        title: 'Lỗi!'
      })
    }
  } catch (error) {
    yield put(event.cancelUserRequestFail(error))
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Lỗi!'
    })
  }
}

export function* actionEvent() {
  yield takeEvery(type.ADD_EVENT, addDataEvent)
  yield takeEvery(type.GET_ALL_EVENT, getDataAllEvent)
  yield takeEvery(type.GET_EVENT_BY_RANGE_DATE, getDataByRangeDate)
  yield takeEvery(type.GET_EVENT_HISTORY, getDataEventHistory)
  yield takeEvery(type.UPDATE_EVENT, updateDataEvent)
  yield takeEvery(type.DELETE_EVENT, deleteDataEvent)
  yield takeEvery(type.COMPLETE_EVENT, completeDataEvent)
  yield takeEvery(type.CANCEL_EVENT, cancelDataEvent)
  yield takeEvery(type.REOPEN_EVENT, reopenDataEvent)
  yield takeEvery(type.SEARCH_EVENT, searchDataEvent)
  yield takeEvery(type.USER_BY_EVENT, getDataUserByEvent)
  yield takeEvery(type.APPROVE_USER_TO_EVENT, approveDataUserToEvent)
  yield takeEvery(type.REMOVE_USER_FROM_EVENT, removeDataUserFromEvent)
  yield takeEvery(type.ADD_USER_TO_EVENT, addDataUserToEvent)
  yield takeEvery(type.CANCEL_USER_REQUEST, cancelDataUserRequest)
}