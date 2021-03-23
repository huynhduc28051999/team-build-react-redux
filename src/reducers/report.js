import * as Type from '@constants/actionTypes'

const initialState = {
  reportUser: {},
  error: null,
  isLoading: false,
  isSuccess: false,
  reportEvent: {},
  reportUserEvent: [],
  userEventDetail: []
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
    case Type.REPORT_EVENT: {
      return {
        ...state,
        isLoading: true,
        error: null,
        reportEvent: {}
      }
    }
    case Type.REPORT_EVENT_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        isLoading: false,
        error: null,
        reportEvent: data
      }
    }
    case Type.REPORT_EVENT_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        error: error,
        isLoading: false
      }
    }
    case Type.REPORT_USER_EVENT: {
      return {
        ...state,
        isLoading: true,
        error: null,
        reportUserEvent: []
      }
    }
    case Type.REPORT_USER_EVENT_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        isLoading: false,
        error: null,
        reportUserEvent: data
      }
    }
    case Type.REPORT_USER_EVENT_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        error: error,
        isLoading: false
      }
    }
    case Type.REPORT_USER_EVENT_DETAIL: {
      return {
        ...state,
        isLoading: true,
        error: null,
        userEventDetail: []
      }
    }
    case Type.REPORT_USER_EVENT_DETAIL_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        isLoading: false,
        error: null,
        userEventDetail: data
      }
    }
    case Type.REPORT_USER_EVENT_DETAIL_FAIL: {
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