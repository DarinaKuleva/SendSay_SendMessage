import { combineReducers } from 'redux'
import sendMessage from './sendMessage'
import messageStatus from './messageStatus'

const rootReducer = combineReducers({
  sendMessage,
  messageStatus
})

export default rootReducer
