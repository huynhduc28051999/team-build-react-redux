import * as Type from '@constants/actionTypes'

const initialState = {
  currentUser: {},
  permission: {},
  error: null,
  isLoading: false,
  isSuccess: false,
  notifications: []
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
        ...state,
        isLoading: true
      }
    }
    case Type.CHANGE_PROFILE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        error: null
      }
    }
    case Type.CHANGE_PROFILE_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        error: error
      }
    }
    case Type.NOTIFICATION: {
      return {
        isLoading: true,
        error: null,
        ...state
      }
    }
    case Type.NOTIFICATION_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        notifications: data
      }
    }
    case Type.NOTIFICATION_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        error: error
      }
    }
    case Type.ADD_NOTIFICATION: {
      const { data } = action.payload
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        notifications: [...state.notifications, data]
      }
    }
    default: {
      return state
    }
  }
}

export default meReducer