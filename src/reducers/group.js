import * as Type from '@constants/actionTypes'

const initialState = {
  isLoading: false,
  isLoadingGet: false,
  groups: [],
  error: null,
  isSuccess: false,
  groupById: null,
  searchGroup: []
}
const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_ALL_GROUP: {
      return {
        ...state,
        isLoadingGet: true
      }
    }
    case Type.GET_ALL_GROUP_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        isLoadingGet: false,
        groups: data
      }
    }
    case Type.GET_ALL_GROUP_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        isLoadingGet: false,
        error: error
      }
    }
    case Type.ADD_GROUP: {
      return {
        ...state,
        isLoading: true,
        error: null,
        isSuccess: false
      }
    }
    case Type.ADD_GROUP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true
      }
    }
    case Type.ADD_GROUP_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        isLoading: true,
        error: error,
        isSuccess: false
      }
    }
    case Type.GET_GROUP_ID: {
      return {
        ...state,
        isLoading: true,
        error: null,
        groupById: null
      }
    }
    case Type.GET_GROUP_ID_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        isLoading: false,
        error: null,
        groupById: data
      }
    }
    case Type.GET_GROUP_ID_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        isLoading: false,
        error: error,
        groupById: null
      }
    }
    case Type.UPDATE_GROUP: {
      return {
        ...state,
        isLoading: true,
        error: null,
        isSuccess: false
      }
    }
    case Type.UPDATE_GROUP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        isSuccess: true
      }
    }
    case Type.UPDATE_GROUP_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        isLoading: false,
        error: error,
        isSuccess: false
      }
    }
    case Type.DELETE_GROUP: {
      return {
        ...state,
        isLoading: true,
        error: null,
        isSuccess: false
      }
    }
    case Type.DELETE_GROUP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true
      }
    }
    case Type.DELETE_GROUP_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        isLoading: true,
        error: error,
        isSuccess: false
      }
    }
    case Type.SEARCH_GROUP: {
      return {
        ...state,
        error: null
      }
    }
    case Type.SEARCH_GROUP_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        searchGroup: data
      }
    }
    case Type.SEARCH_GROUP_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        error: error
      }
    }
    default: {
      return state
    }
  }
}

export default groupReducer