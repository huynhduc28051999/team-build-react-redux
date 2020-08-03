import * as type from '@constants/actionTypes'

export const loginContruction = data => {
  return {
    type: type.LOGIN_CONSTRUCTION,
    payload: {
      data
    }
  }
}

export const loginContructionSuccess = data => {
  return {
    type: type.LOGIN_CONSTRUCTION_SUCCESS,
    payload: {
      data
    }
  }
}

export const loginContructionFailed = error => {
  return {
    type: type.LOGIN_CONSTRUCTION_FAIL,
    payload: {
      error
    }
  }
}

export const logout = () => {
  return {
    type: type.LOGOUT,
    payload: { }
  }
}
