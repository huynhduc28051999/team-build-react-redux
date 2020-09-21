import * as Type from '@constants/actionTypes'

const initialState = {
  permission: [],
  error: null,
  isLoading: false
}
const permissionReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.PERMISSION: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Type.PERMISSION_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        permission: data,
        isLoading: false
      }
    }
    case Type.PERMISSION_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        error: error,
        isLoading: false
      }
    }
    default: {
      return state
    }
  }
}

export default permissionReducer