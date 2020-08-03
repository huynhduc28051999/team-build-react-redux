import * as type from '@constants/actionTypes'

export const meContruction = () => {
  return {
    type: type.ME_CONSTRUCTION,
    payload: {}
  }
}

export const meContructionSucces = data => {
  return {
    type: type.ME_CONSTRUCTION_SUCCESS,
    payload: {
      data
    }
  }
}

export const meContructionFail = error => {
  return {
    type: type.ME_CONSTRUCTION_FAIL,
    payload: {
      error
    }
  }
}

export const changeProfileContruction = (data) => {
  return {
    type: type.CHANGE_PROFILE,
    payload: {
      data
    }
  }
}

export const changeProfileSucces = data => {
  return {
    type: type.CHANGE_PROFILE_SUCCESS,
    payload: {
      data
    }
  }
}

export const changeProfileFail = error => {
  return {
    type: type.CHANGE_PROFILE_FAIL,
    payload: {
      error
    }
  }
}