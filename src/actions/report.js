import * as type from '@constants/actionTypes'

export const reportUser = ({ reportType, startDate, endDate }) => {
  return {
    type: type.REPORT_USER,
    payload: {
      type: reportType,
      startDate,
      endDate
    }
  }
}

export const reportUserSuccess = data => {
  return {
    type: type.REPORT_USER_SUCCESS,
    payload: {
      data
    }
  }
}

export const reportUserFailed = error => {
  return {
    type: type.REPORT_USER_FAIL,
    payload: {
      error
    }
  }
}

export const reportEvent = ({ reportType, startDate, endDate }) => {
  return {
    type: type.REPORT_EVENT,
    payload: {
      type: reportType,
      startDate,
      endDate
    }
  }
}

export const reportEventSuccess = data => {
  return {
    type: type.REPORT_EVENT_SUCCESS,
    payload: {
      data
    }
  }
}

export const reportEventFailed = error => {
  return {
    type: type.REPORT_EVENT_FAIL,
    payload: {
      error
    }
  }
}
