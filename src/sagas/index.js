import { fork } from 'redux-saga/effects'
import { watchSendMessage } from './sendMessage'
import { watchMessageStatus } from './messageStatus'

export default function * rootSaga () {
  yield fork(watchSendMessage)
  yield fork(watchMessageStatus)
}
