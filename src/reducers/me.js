import * as Type from '@constants/actionTypes'

const initialState = {
  currentUser: {},
  permission: {},
  error: null,
  isLoading: false,
  isSuccess: false
}
const meReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.ME_CONSTRUCTION: {
      return {
        ...state
      }
    }
    case Type.ME_CONSTRUCTION_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        currentUser: data.currentUser,
        permission: data.permission
      }
    }
    case Type.ME_CONSTRUCTION_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        error: error
      }
    }
    case Type.CHANGE_PASSWORD: {
      return {
        ...state,
        isLoading: true,
        isSuccess: false
      }
    }
    case Type.CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        error: null
      }
    }
    case Type.CHANGE_PASSWORD_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        error: error,
        isLoading: false,
        isSuccess: false
      }
    }
    case Type.CHANGE_PROFILE: {
      return {
        isLoading: true,
        ...state
      }
    }
    case Type.CHANGE_PROFILE_SUCCESS: {
      return {
        isLoading: false,
        isSuccess: true,
        error: null,
        ...state
      }
    }
    case Type.CHANGE_PROFILE_FAIL: {
      const { error } = action.payload
      return {
        isLoading: false,
        isSuccess: false,
        error: error,
        ...state
      }
    }
    default: {
      return state
    }
  }
}

export default meReducer