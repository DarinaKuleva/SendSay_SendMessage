import * as React from 'react'
import { connect } from 'react-redux'
import { requestSendMessage } from '../../actions/sendMessage'
import { requestMessageStatus } from '../../actions/messageStatus'
import * as selectors from '../../selectors/sendMessage'
import { fieldPlaceholders, fieldMaxLength } from '../../constants/messageForm'
import { getDateNow } from '../../utils/convertDate'
import InputContainer from './InputContainer'
import FieldContainer from './FieldContainer'
import Attachment from './Attachment'
import LoadingSendMessage from './LoadingSendMessage'
import DragAndDropFiles from './DragAndDropFiles'
import './MessageForm.scss'

const mapStateToProps = state => ({
  isLoadingSendMessage: selectors.isLoadingSendMessage(state),
  isErrorSendMessage: selectors.isErrorSendMessage(state),
  trackId: selectors.messageTrackId(state)
})

const mapDispatchToProps = dispatch => ({
  sendMessage: (values) => dispatch(requestSendMessage(values)),
  getStatus: (trackId) => dispatch(requestMessageStatus(trackId))
})

const MessageForm = (props) => {
  const {
    trackId,
    isLoadingSendMessage,
    isErrorSendMessage,
    sendMessage,
    getStatus,
    values,
    setFieldValue,
    resetForm,
    handleBlur,
    errors,
    touched
  } = props

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_DROP_DEPTH':
        return {...state, dropDepth: action.dropDepth}
      case 'SET_IN_DROP_ZONE':
        return {...state, inDropZone: action.inDropZone}
      case 'ADD_FILE_TO_LIST':
        return {...state, attachments: state.attachments.concat(action.files)}
      default:
        return state
    }
  }

  const [data, dispatch] = React.useReducer(
    reducer,
    {dropDepth: 0, inDropZone: false, attachments: []}
  )

  React.useEffect(() => {
    setFieldValue('attachments', data.attachments)
  }, [data.attachments])

  React.useEffect(() => {
    if (!trackId || isErrorSendMessage) {
      return
    }

    getStatus(trackId)
  }, [trackId])

  const isEmptyErrors = (errors) => !Object.keys(errors).length
  const isFormFieldValid = isEmptyErrors(errors) && !isEmptyErrors(touched) && !isLoadingSendMessage

  const getFieldProps = (name) => ({
    name,
    id: name,
    placeholder: fieldPlaceholders[name],
    value: values[name],
    maxLength: fieldMaxLength[name],
    onChange: (e) => setFieldValue(name, e.target.value),
    onBlur: handleBlur,
    autoComplete: 'off'
  })

  const getButtonClassName = () => {
    if (isFormFieldValid) {
      return ('MessageForm__button')
    } else {
      return ('MessageForm__button MessageForm__button--disabled')
    }
  }

  const handleSubmit = (e) => {
    e.stopPropagation()
    e.preventDefault()
    resetForm()
    const dateNow = getDateNow()

    const valuesWithDate = {dateNow, ...values}
    sendMessage(valuesWithDate)
  }

  if (isLoadingSendMessage) return <LoadingSendMessage />

  return (
    <section className={'MessageForm'}>
      <DragAndDropFiles data={data} dispatch={dispatch}>
      <h2 className={'MessageForm__title'}>Отправлялка сообщений</h2>
      <InputContainer name={'senderName'}>
        <FieldContainer name={'senderName'}>
          <input
            {...getFieldProps('senderName')}
            className={'MessageForm__field MessageForm__field--name'}
          />
        </FieldContainer>
        <FieldContainer name={'senderEmail'}>
          <input
            {...getFieldProps('senderEmail')}
            className={'MessageForm__field MessageForm__field--email'}
          />
        </FieldContainer>
      </InputContainer>
      <InputContainer name={'recipientName'}>
        <FieldContainer name={'recipientName'}>
          <input
            {...getFieldProps('recipientName')}
            className={'MessageForm__field MessageForm__field--name'}
          />
        </FieldContainer>
        <FieldContainer name={'recipientEmail'}>
          <input
            {...getFieldProps('recipientEmail')}
            className={'MessageForm__field MessageForm__field--email'}
          />
        </FieldContainer>
      </InputContainer>
      <InputContainer name={'messageTopic'}>
        <FieldContainer name={'messageTopic'}>
          <input
            {...getFieldProps('messageTopic')}
            className={'MessageForm__field'}
          />
        </FieldContainer>
      </InputContainer>
      <InputContainer name={'message'}>
        <FieldContainer name={'message'}>
          <textarea
            {...getFieldProps('message')}
            className={'MessageForm__field MessageForm__field--message'}
          />
        </FieldContainer>
      </InputContainer>
      <Attachment/>
      <button
        type="submit"
        className={getButtonClassName()}
        onClick={handleSubmit}
        disabled={!isFormFieldValid}
      >
        Отправить
      </button>
      </DragAndDropFiles>
    </section>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm)
