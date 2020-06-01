import {
  FAILURE_MESSAGE_STATUS,
  REQUEST_MESSAGE_STATUS,
  SUCCESS_MESSAGE_STATUS
} from '../actions/messageStatus'

export const initialState = {
  isError: false,
  loading: false,
  data: []
}

const messageStatus = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_MESSAGE_STATUS:
      return {
        ...state,
        loading: true
      }

    case FAILURE_MESSAGE_STATUS:
      return {
        ...state,
        isError: action.isError,
        loading: false
      }

    case SUCCESS_MESSAGE_STATUS:
      return {
        ...initialState,
        data: [...state.data, action.data]
      }

    default:
      return state
  }
}

export default messageStatus
