export const REQUEST_SEND_MESSAGE = 'REQUEST_SEND_MESSAGE'
export const SUCCESS_SEND_MESSAGE = 'SUCCESS_SEND_MESSAGE'
export const FAILURE_SEND_MESSAGE = 'FAILURE_SEND_MESSAGE'

export const requestSendMessage = (values) => ({
  type: REQUEST_SEND_MESSAGE,
  values
})

export const successSendMessage = (trackId) => ({
  type: SUCCESS_SEND_MESSAGE,
  trackId
})

export const failureSendMessage = (errors) => ({
  type: FAILURE_SEND_MESSAGE,
  isError: !!errors
})
