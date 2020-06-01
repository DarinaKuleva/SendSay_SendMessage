import {
  FAILURE_SEND_MESSAGE,
  REQUEST_SEND_MESSAGE,
  SUCCESS_SEND_MESSAGE
} from '../actions/sendMessage'

export const initialState = {
  data: {},
  isError: false,
  loading: false,
  trackId: null
}

const sendMessage = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SEND_MESSAGE:
      return {
        ...state,
        data: action.values,
        loading: true
      }

    case FAILURE_SEND_MESSAGE:
      return {
        ...state,
        isError: action.isError,
        loading: false
      }

    case SUCCESS_SEND_MESSAGE:
      return {
        ...state,
        trackId: action.trackId,
        loading: false,
        isError: false
      }

    default:
      return state
  }
}

export default sendMessage
