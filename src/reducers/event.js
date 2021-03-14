import * as Type from '@constants/actionTypes'

const initialState = {
  events: [],
  error: null,
  isSuccess: false,
  isLoading: false,
  isLoadingGet: false,
  eventHistory: [],
  searchEvent: [],
  userByEvent: [],
  eventById: null,
  feedbackByEvent: []
}
const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_ALL_EVENT: {
      return {
        ...state,
        isLoadingGet: true,
        error: null
      }
    }
    case Type.GET_EVENT_BY_RANGE_DATE: {
      return {
        ...state,
        isLoadingGet: true,
        error: null
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
    case Type.GET_EVENT_HISTORY: {
      return {
        ...state,
        error: null,
        eventHistory: []
      }
    }
    
    case Type.GET_EVENT_HISTORY_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        eventHistory: data
      }
    }
    case Type.GET_EVENT_HISTORY_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        error: error
      }
    }
    case Type.UPDATE_EVENT: {
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        error: null
      }
    }
    case Type.UPDATE_EVENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true
      }
    }
    case Type.UPDATE_EVENT_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        error: error,
        isLoading: false
      }
    }
    case Type.DELETE_EVENT: {
      return {
        ...state,
        isSuccess: false,
        error: null
      }
    }
    case Type.DELETE_EVENT_SUCCESS: {
      return {
        ...state,
        isSuccess: true
      }
    }
    case Type.DELETE_EVENT_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        error: error
      }
    }
    case Type.COMPLETE_EVENT: {
      return {
        ...state,
        isSuccess: false,
        error: null
      }
    }
    case Type.COMPLETE_EVENT_SUCCESS: {
      return {
        ...state,
        isSuccess: true
      }
    }
    case Type.COMPLETE_EVENT_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        error: error
      }
    }
    case Type.CANCEL_EVENT: {
      return {
        ...state,
        isSuccess: false,
        error: null
      }
    }
    case Type.CANCEL_EVENT_SUCCESS: {
      return {
        ...state,
        isSuccess: true
      }
    }
    case Type.CANCEL_EVENT_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        error: error
      }
    }
    case Type.REOPEN_EVENT: {
      return {
        ...state,
        isSuccess: false,
        error: null
      }
    }
    case Type.REOPEN_EVENT_SUCCESS: {
      return {
        ...state,
        isSuccess: true
      }
    }
    case Type.REOPEN_EVENT_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        error: error
      }
    }
    case Type.SEARCH_EVENT: {
      return {
        ...state,
        isLoadingGet: true,
        error: null
      }
    }
    case Type.SEARCH_EVENT_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        isLoadingGet: false,
        searchEvent: data
      }
    }
    case Type.SEARCH_EVENT_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        error: error,
        isLoadingGet: false
      }
    }
    case Type.USER_BY_EVENT: {
      return {
        ...state,
        isLoadingGet: true,
        userByEvent: [],
        error: null
      }
    }
    case Type.USER_BY_EVENT_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        isLoadingGet: false,
        userByEvent: data,
      }
    }
    case Type.USER_BY_EVENT_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        error: error,
        isLoadingGet: false
      }
    }
    case Type.APPROVE_USER_TO_EVENT: {
      return {
        ...state,
        isSuccess: false,
        error: null
      }
    }
    case Type.APPROVE_USER_TO_EVENT_SUCCESS: {
      return {
        ...state,
        isSuccess: true
      }
    }
    case Type.APPROVE_USER_TO_EVENT_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        error: error,
        isSuccess: false
      }
    }
    case Type.REMOVE_USER_FROM_EVENT: {
      return {
        ...state,
        isSuccess: false,
        error: null
      }
    }
    case Type.REMOVE_USER_FROM_EVENT_SUCCESS: {
      return {
        ...state,
        isSuccess: true
      }
    }
    case Type.REMOVE_USER_FROM_EVENT_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        error: error,
        isSuccess: false
      }
    }
    case Type.ADD_USER_TO_EVENT: {
      return {
        ...state,
        isSuccess: false,
        error: null
      }
    }
    case Type.ADD_USER_TO_EVENT_SUCCESS: {
      return {
        ...state,
        isSuccess: true
      }
    }
    case Type.ADD_USER_TO_EVENT_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        error: error,
        isSuccess: false
      }
    }
    case Type.CANCEL_USER_REQUEST: {
      return {
        ...state,
        isSuccess: false,
        error: null
      }
    }
    case Type.CANCEL_USER_REQUEST_SUCCESS: {
      return {
        ...state,
        isSuccess: true
      }
    }
    case Type.CANCEL_USER_REQUEST_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        error: error,
        isSuccess: false
      }
    }
    case Type.GET_EVENT_BY_ID: {
      return {
        ...state,
        isLoadingGet: true,
        error: null,
        eventById: null
      }
    }
    case Type.GET_EVENT_BY_ID_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        isLoadingGet: false,
        eventById: data
      }
    }
    case Type.GET_EVENT_BY_ID_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        isLoadingGet: false,
        error
      }
    }
    case Type.FEEDBACK_BY_EVENT: {
      return {
        ...state,
        error: null,
        feedbackByEvent: []
      }
    }
    case Type.FEEDBACK_BY_EVENT_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        feedbackByEvent: data
      }
    }
    case Type.FEEDBACK_BY_EVENT_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        error
      }
    }
    default: {
      return state
    }
  }
}

export default eventReducer