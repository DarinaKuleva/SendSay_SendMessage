export const REQUEST_MESSAGE_STATUS = 'REQUEST_MESSAGE_STATUS'
export const SUCCESS_MESSAGE_STATUS = 'SUCCESS_MESSAGE_STATUS'
export const FAILURE_MESSAGE_STATUS = 'FAILURE_MESSAGE_STATUS'

export const requestMessageStatus = (trackId) => ({
  type: REQUEST_MESSAGE_STATUS,
  trackId
})

export const successMessageStatus = (data) => ({
  type: SUCCESS_MESSAGE_STATUS,
  data
})

export const failureMessageStatus = (errors) => ({
  type: FAILURE_MESSAGE_STATUS,
  isError: !!errors
})
