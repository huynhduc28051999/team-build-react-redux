import * as Type from '@constants/actionTypes'

const initialState = {
  isLoading: false,
  isLoadingGet: false,
  users: [],
  error: null,
  isSuccess: false,
  userById: null
}
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_ALL_USER: {
      return {
        ...state,
        isLoadingGet: true,
        error: null
      }
    }
    case Type.GET_ALL_USER_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        isLoadingGet: false,
        users: data,
        error: null
      }
    }
    case Type.GET_ALL_USER_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        error: error,
        isLoadingGet: false
      }
    }
    case Type.ADD_USER: {
      return {
        ...state,
        isLoading: true,
        error: null,
        isSuccess: false
      }
    }
    case Type.ADD_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        isSuccess: true
      }
    }
    case Type.ADD_USER_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        isLoading: false,
        error: error,
        isSuccess: false
      }
    }
    case Type.GET_USER_ID: {
      return {
        ...state,
        isLoading: true,
        error: null,
        userById: null
      }
    }
    case Type.GET_USER_ID_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        isLoading: false,
        error: null,
        userById: data
      }
    }
    case Type.GET_USER_ID_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        isLoading: false,
        error: error,
        userById: null
      }
    }
    case Type.UPDATE_USER: {
      return {
        ...state,
        isLoading: true,
        error: null,
        isSuccess: false
      }
    }
    case Type.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        isSuccess: true
      }
    }
    case Type.UPDATE_USER_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        isLoading: false,
        error: error,
        isSuccess: false
      }
    }
    case Type.DELETE_USER: {
      return {
        ...state,
        isLoading: true,
        error: null,
        isSuccess: false
      }
    }
    case Type.DELETE_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true
      }
    }
    case Type.DELETE_USER_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        isLoading: true,
        error: error,
        isSuccess: false
      }
    }
    default: {
      return state
    }
  }
}

export default userReducer