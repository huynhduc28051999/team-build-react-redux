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


export const getEventHistory = ({ idEvent }) => {
  return {
    type: type.GET_EVENT_HISTORY,
    payload: { idEvent }
  }
}

export const getEventHistorySuccess = data => {
  return {
    type: type.GET_EVENT_HISTORY_SUCCESS,
    payload: {
      data
    }
  }
}

export const getEventHistoryFailed = error => {
  return {
    type: type.GET_EVENT_HISTORY_FAIL,
    payload: {
      error
    }
  }
}

export const updateEvent = ({ _id, input }) => {
  return {
    type: type.UPDATE_EVENT,
    payload: {
      _id,
      input
    }
  }
}

export const updateEventSucces = () => {
  return {
    type: type.UPDATE_EVENT_SUCCESS,
    payload: {}
  }
}

export const updateEventFail = error => {
  return {
    type: type.UPDATE_EVENT_FAIL,
    payload: {
      error
    }
  }
}

export const deleteEvent = ({ ids }) => {
  return {
    type: type.DELETE_EVENT,
    payload: {
      ids
    }
  }
}

export const deleteEventSucces = () => {
  return {
    type: type.DELETE_EVENT_SUCCESS,
    payload: {}
  }
}

export const deleteEventFail = error => {
  return {
    type: type.DELETE_EVENT_FAIL,
    payload: {
      error
    }
  }
}

export const completeEvent = ({ _id }) => {
  return {
    type: type.COMPLETE_EVENT,
    payload: {
      _id
    }
  }
}

export const completeEventSucces = () => {
  return {
    type: type.COMPLETE_EVENT_SUCCESS,
    payload: {}
  }
}

export const completeEventFail = error => {
  return {
    type: type.COMPLETE_EVENT_FAIL,
    payload: {
      error
    }
  }
}

export const cancelEvent = ({ _id }) => {
  return {
    type: type.CANCEL_EVENT,
    payload: {
      _id
    }
  }
}

export const cancelEventSucces = () => {
  return {
    type: type.CANCEL_EVENT_SUCCESS,
    payload: {}
  }
}

export const cancelEventFail = error => {
  return {
    type: type.CANCEL_EVENT_FAIL,
    payload: {
      error
    }
  }
}

export const reopenEvent = ({ _id }) => {
  return {
    type: type.REOPEN_EVENT,
    payload: {
      _id
    }
  }
}

export const reopenEventSucces = () => {
  return {
    type: type.REOPEN_EVENT_SUCCESS,
    payload: {}
  }
}

export const reopenEventFail = error => {
  return {
    type: type.REOPEN_EVENT_FAIL,
    payload: {
      error
    }
  }
}
