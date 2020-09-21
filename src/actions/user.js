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

export const addUser = (data) => {
  return {
    type: type.ADD_USER,
    payload: { data }
  }
}

export const addUserSuccess = data => {
  return {
    type: type.ADD_USER_SUCCESS,
    payload: {
      data
    }
  }
}

export const addUserFail = error => {
  return {
    type: type.ADD_USER_FAIL,
    payload: {
      error
    }
  }
}
