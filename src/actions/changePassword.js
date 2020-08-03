import * as type from '@constants/actionTypes'

export const changePassword = data => {
  return {
    type: type.CHANGE_PASSWORD,
    payload: {
      data
    }
  }
}

export const changePasswordSuccess = data => {
  return {
    type: type.CHANGE_PASSWORD_SUCCESS,
    payload: {
      data
    }
  }
}

export const changePasswordFailed = error => {
  return {
    type: type.CHANGE_PASSWORD_FAIL,
    payload: {
      error
    }
  }
}
