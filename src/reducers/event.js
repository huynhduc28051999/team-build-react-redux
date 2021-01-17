import * as Type from '@constants/actionTypes'

const initialState = {
  events: [],
  error: null,
  isSuccess: false,
  isLoading: false
}
const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.ADD_EVENT: {
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        error: null
      }
    }
    case Type.ADD_EVENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true
      }
    }
    case Type.ADD_EVENT_FAIL: {
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

export default eventReducer