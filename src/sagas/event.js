import { call, put, takeEvery } from 'redux-saga/effects'
import * as event from '@actions/event'
import * as type from '@constants/actionTypes'
import * as apiUrl from '@constants/apiUrl'
import axiosClient from '@utils/axiosClient'
import { OpenNotification } from '@components/Notification'

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
      // yield put(group.getAllGroup())
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

export function* actionEvent() {
  yield takeEvery(type.ADD_EVENT, addDataEvent)
}