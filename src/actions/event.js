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


export const getAllEvent = () => {
  return {
    type: type.GET_ALL_EVENT,
    payload: { }
  }
}

export const getAllEventSuccess = data => {
  return {
    type: type.GET_ALL_EVENT_SUCCESS,
    payload: {
      data
    }
  }
}

export const getAllEventFailed = error => {
  return {
    type: type.GET_ALL_EVENT_FAIL,
    payload: {
      error
    }
  }
}

export const getEventByRangeDate = ({ startDate, endDate }) => {
  return {
    type: type.GET_EVENT_BY_RANGE_DATE,
    payload: {
      startDate,
      endDate
    }
  }
}
