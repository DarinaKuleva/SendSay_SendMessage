import { call, put, takeEvery, select } from 'redux-saga/effects'
import { getMessageStatus } from '../api'
import * as actionCreators from '../actions/messageStatus'
import { messageTopic, messageDate } from '../selectors/sendMessage'

export function * messageStatus ({trackId}) {
  try {
    const status = yield call(getMessageStatus, trackId)
    const topic = yield select(messageTopic)
    const date = yield select(messageDate)

    yield put(actionCreators.successMessageStatus({status: status.obj.status, topic, date}))
  } catch (error) {
    yield put(actionCreators.failureMessageStatus(error))
  }
}

export function * watchMessageStatus () {
  yield takeEvery(actionCreators.REQUEST_MESSAGE_STATUS, messageStatus)
}
