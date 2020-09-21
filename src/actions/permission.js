import * as type from '@constants/actionTypes'

export const getAllPermisson = () => {
  return {
    type: type.PERMISSION,
    payload: {}
  }
}

export const getAllPermissonSucces = data => {
  return {
    type: type.PERMISSION_SUCCESS,
    payload: {
      data
    }
  }
}

export const getAllPermissonFail = error => {
  return {
    type: type.PERMISSION_FAIL,
    payload: {
      error
    }
  }
}
