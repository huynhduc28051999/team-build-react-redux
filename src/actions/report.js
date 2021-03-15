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
