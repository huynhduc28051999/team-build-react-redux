import * as type from '@constants/actionTypes'

export const addEvent = input => {
  return {
    type: type.ADD_EVENT,
    payload: {
      input
    }
  }
}

export const addEventSucces = () => {
  return {
    type: type.ADD_EVENT_SUCCESS,
    payload: {}
  }
}

export const addEventFail = error => {
  return {
    type: type.ADD_EVENT_FAIL,
    payload: {
      error
    }
  }
}
