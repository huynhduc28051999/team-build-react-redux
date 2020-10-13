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

export const getUserById = data => {
  return {
    type: type.GET_USER_ID,
    payload: {
      data
    }
  }
}

export const getUserByIdSuccess = data => {
  return {
    type: type.GET_USER_ID_SUCCESS,
    payload: {
      data
    }
  }
}

export const getUserByIdFail = error => {
  return {
    type: type.GET_USER_ID_FAIL,
    payload: {
      error
    }
  }
}

export const updateUser = data => {
  return {
    type: type.UPDATE_USER,
    payload: {
      data
    }
  }
}

export const updateUserSuccess = data => {
  return {
    type: type.UPDATE_USER_SUCCESS,
    payload: {
      data
    }
  }
}

export const updateUserFail = error => {
  return {
    type: type.UPDATE_USER_FAIL,
    payload: {
      error
    }
  }
}

export const deleteUser = ({ ids }) => {
  return {
    type: type.DELETE_USER,
    payload: {
      data: { ids }
    }
  }
}

export const deleteUserSuccess = (data) => {
  return {
    type: type.DELETE_USER_SUCCESS,
    payload: {
      data
    }
  }
}

export const deleteUserFail = (error) => {
  return {
    type: type.DELETE_USER_FAIL,
    payload: {
      error
    }
  }
}