import * as Type from '@constants/actionTypes'

const initialState = {
  reportUser: {},
  error: null,
  isLoading: false,
  isSuccess: false
}
const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.REPORT_USER: {
      return {
        ...state,
        isLoading: true,
        error: null,
        reportUser: {}
      }
    }
    case Type.REPORT_USER_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        isLoading: false,
        error: null,
        reportUser: data
      }
    }
    case Type.REPORT_USER_FAIL: {
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

export default reportReducer