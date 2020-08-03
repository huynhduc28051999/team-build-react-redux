import * as Type from '@constants/actionTypes'

const initialState = {
  isAuthenticated: localStorage.getItem("access-token") ? true: false,
  token: localStorage.getItem("access-token"),
  error: null,
  isLoadingAuth: false
}
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.LOGOUT: {
      return {
        ...state,
        token: null,
        isAuthenticated: false
      }
    }
    case Type.LOGIN_CONSTRUCTION: {
      return {
        ...state,
        isLoadingAuth: true
      }
    }
    case Type.LOGIN_CONSTRUCTION_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        token: data.token,
        isAuthenticated: true,
        isLoadingAuth: false
      }
    }
    case Type.LOGIN_CONSTRUCTION_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        error: error,
        isAuthenticated: false,
        isLoadingAuth: false
      }
    }
    default: {
      return state
    }
  }
}

export default authReducer