import * as Type from '@constants/actionTypes'

const initialState = {
  isLoading: false,
  isLoadingGet: false,
  users: [],
  error: null,
  isSuccess: false,
  // groupById: null
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
    default: {
      return state
    }
  }
}

export default userReducer