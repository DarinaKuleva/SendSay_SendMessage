import React from 'react'
import { Formik } from 'formik'
import { initialValues, schemaValidation } from '../../utils/messageForm'
import MessageForm from '../../components/MessageForm'
import './SendMessage.scss'

const SendMessage = () => {
  return (
    <section className={'SendMessage'}>
      <Formik
        initialValues={initialValues}
        validationSchema={schemaValidation}
      >
        {props =>
          <MessageForm{...props}/>
        }
      </Formik>
    </section>
  )
}

export default SendMessage
