import * as type from '@constants/actionTypes'

export const getAllGroup = () => {
  return {
    type: type.GET_ALL_GROUP,
    payload: { }
  }
}

export const getAllGroupSuccess = data => {
  return {
    type: type.GET_ALL_GROUP_SUCCESS,
    payload: {
      data
    }
  }
}

export const getAllGroupFailed = error => {
  return {
    type: type.GET_ALL_GROUP_FAIL,
    payload: {
      error
    }
  }
}

export const addGroup = data => {
  return {
    type: type.ADD_GROUP,
    payload: {
      data
    }
  }
}

export const addGroupSuccess = data => {
  return {
    type: type.ADD_GROUP_SUCCESS,
    payload: {
      data
    }
  }
}

export const addGroupFail = error => {
  return {
    type: type.ADD_GROUP_FAIL,
    payload: {
      error
    }
  }
}

export const getGroupById = data => {
  return {
    type: type.GET_GROUP_ID,
    payload: {
      data
    }
  }
}

export const getGroupByIdSuccess = data => {
  return {
    type: type.GET_GROUP_ID_SUCCESS,
    payload: {
      data
    }
  }
}

export const getGroupByIdFail = error => {
  return {
    type: type.GET_GROUP_ID_FAIL,
    payload: {
      error
    }
  }
}

export const updateGroup = ({ _id, input }) => {
  return {
    type: type.UPDATE_GROUP,
    payload: {
      data: { _id, input }
    }
  }
}

export const updateGroupSuccess = (data) => {
  return {
    type: type.UPDATE_GROUP_SUCCESS,
    payload: {
      data
    }
  }
}

export const updateGroupFail = (error) => {
  return {
    type: type.UPDATE_GROUP_FAIL,
    payload: {
      error
    }
  }
}

export const deleteGroup = ({ ids }) => {
  return {
    type: type.DELETE_GROUP,
    payload: {
      data: { ids }
    }
  }
}

export const deleteGroupSuccess = (data) => {
  return {
    type: type.DELETE_GROUP_SUCCESS,
    payload: {
      data
    }
  }
}

export const deleteGroupFail = (error) => {
  return {
    type: type.DELETE_GROUP_FAIL,
    payload: {
      error
    }
  }
}

export const searchGroup = ({ keyword }) => {
  return {
    type: type.SEARCH_GROUP,
    payload: {
      data: { keyword }
    }
  }
}

export const searchGroupSuccess = (data) => {
  return {
    type: type.SEARCH_GROUP_SUCCESS,
    payload: {
      data
    }
  }
}

export const searchGroupFail = (error) => {
  return {
    type: type.SEARCH_GROUP_FAIL,
    payload: {
      error
    }
  }
}