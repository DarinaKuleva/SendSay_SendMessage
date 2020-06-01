import { call, put, takeEvery } from 'redux-saga/effects'
import { requestSendMessage } from '../api'
import * as actionCreators from '../actions/sendMessage'

export function * sendMessage ({values}) {
  try {
    const response = yield call(requestSendMessage, values)

    yield put(actionCreators.successSendMessage(response['track.id']))
  } catch (error) {
    yield put(actionCreators.failureSendMessage(error))
  }
}

export function * watchSendMessage () {
  yield takeEvery(actionCreators.REQUEST_SEND_MESSAGE, sendMessage)
}
