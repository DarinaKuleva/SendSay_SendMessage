import React from 'react'
import { connect } from 'react-redux'
import * as selectors from '../../selectors/getStatus'
import { isErrorSendMessage } from '../../selectors/sendMessage'
import { getCroppedMessageTopic } from '../../utils'
import './MessageHistory.scss'

const mapStateToProps = state => ({
  isLoadingGetStatus: selectors.isLoadingGetStatus(state),
  isErrorSendMessage: isErrorSendMessage(state),
  isErrorGetStatus: selectors.isErrorGetStatus(state),
  messageStatus: selectors.messageStatus(state)
})

const MessageHistory = (props) => {
  const {
    isLoadingGetStatus,
    isErrorSendMessage,
    isErrorGetStatus,
    messageStatus
  } = props

  const getMessageStatus = (statusCode, isError) => {
    if (isError || statusCode < -1)
      return <p className={'MessageHistory__status MessageHistory__status--error'}>Ошибка</p>
    if (statusCode > -1)
      return <p className={'MessageHistory__status MessageHistory__status--pending'}>В очереди</p>
    if (statusCode === -1)
      return <p className={'MessageHistory__status MessageHistory__status--success'}>Отправлено</p>
  }

  return (
    <section className={'MessageHistory'}>
      <h3 className={'MessageHistory__title'}>Отправленные сообщения</h3>
      {isErrorSendMessage && !isLoadingGetStatus &&
        <p className={'MessageHistory__error'}>
          При отправке сообщения произошла ошибка. Повторите попытку.
        </p>
      }
      {isLoadingGetStatus &&
        <div className={'MessageHistory__loader'}/>
      }
      {!messageStatus.length
        ? <p className={'MessageHistory__emptyStatus'}>
          Сообщения ещё не отправлялись
        </p>
        : <table className={'MessageHistory__table'}>
          <tbody>
          <tr className={'MessageHistory__table MessageHistory__table--header'}>
            <th className={'MessageHistory__table--title'}>Дата</th>
            <th className={'MessageHistory__table--title'}>Тема</th>
            <th className={'MessageHistory__table--title'}>Статус</th>
          </tr>
          {messageStatus.map((messageStatus, index) =>
            <tr
              className={'MessageHistory__table MessageHistory__table--row'}
              key={index}
            >
              <th className={'MessageHistory__table--column'}>{messageStatus.date}</th>
              <th className={'MessageHistory__table--column'}>
                {getCroppedMessageTopic(messageStatus.topic, 57)}
              </th>
              <th className={'MessageHistory__table--column'}>
                {getMessageStatus(Number(messageStatus.status), isErrorGetStatus)}
              </th>
            </tr>
          )}
          </tbody>
        </table>
      }
    </section>
  )
}

export default connect(mapStateToProps)(MessageHistory)
