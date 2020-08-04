import * as type from '@constants/actionTypes'

export const getAllUser = () => {
  return {
    type: type.GET_ALL_USER,
    payload: {}
  }
}

export const getAllUserSucces = data => {
  return {
    type: type.GET_ALL_USER_SUCCESS,
    payload: {
      data
    }
  }
}

export const getAllUserFail = error => {
  return {
    type: type.GET_ALL_USER_FAIL,
    payload: {
      error
    }
  }
}