import { call, put, takeEvery } from 'redux-saga/effects'
import * as report from '@actions/report'
import * as type from '@constants/actionTypes'
import * as apiUrl from '@constants/apiUrl'
import axiosClient from '@utils/axiosClient'
import { OpenNotification } from '@components/Notification'

function reportUser(fromData) {
  return axiosClient.get(apiUrl.URL_API_REPORT_USER, {
    params: { ...fromData.payload }
  })
}
export function* reportDataUser(fromData) {
  try {
    const response = yield call(reportUser, fromData)
    const { data } = response
    if (data) {
      yield put(report.reportUserSuccess(data))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Lấy dữ liệu báo cáo thành công!'
      })
    } else {
      yield put(report.reportUserFailed(data))
      OpenNotification({
        type: 'error',
        description: data,
        title: 'Lỗi!'
      })
    }
  } catch (error) {
    yield put(report.reportUserFailed(error))
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Lỗi!'
    })
  }
}

function reportEvent(fromData) {
  return axiosClient.get(apiUrl.URL_API_REPORT_EVENT, {
    params: { ...fromData.payload }
  })
}
export function* reportDataEvent(fromData) {
  try {
    const response = yield call(reportEvent, fromData)
    const { data } = response
    if (data) {
      yield put(report.reportEventSuccess(data))
      OpenNotification({
        type: 'success',
        description: '',
        title: 'Lấy dữ liệu báo cáo thành công!'
      })
    } else {
      yield put(report.reportEventFailed(data))
      OpenNotification({
        type: 'error',
        description: data,
        title: 'Lỗi!'
      })
    }
  } catch (error) {
    yield put(report.reportEventFailed(error))
    OpenNotification({
      type: 'error',
      description: error,
      title: 'Lỗi!'
    })
  }
}
export function* actionReport() {
  yield takeEvery(type.REPORT_USER, reportDataUser)
  yield takeEvery(type.REPORT_EVENT, reportDataEvent)
}