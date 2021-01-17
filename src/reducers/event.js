import * as Type from '@constants/actionTypes'

const initialState = {
  events: [],
  error: null,
  isSuccess: false,
  isLoading: false,
  isLoadingGet: false
}
const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_ALL_EVENT: {
      return {
        ...state,
        isLoadingGet: true
      }
    }
    case Type.GET_ALL_EVENT_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        isLoadingGet: false,
        events: data
      }
    }
    case Type.GET_ALL_EVENT_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        isLoadingGet: false,
        error: error
      }
    }
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