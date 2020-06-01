import * as React from 'react'
import { ErrorMessage } from 'formik'
import './FieldContainer.scss'

const FieldContainer = (props) => {
  const {children, name} = props

  return (
    <div className={'FieldContainer'}>
      {children}
      <ErrorMessage name={name}>
        {message =>
          <p className={'FieldContainer__error'}>
            {message}
          </p>
        }
      </ErrorMessage>
    </div>
  )
}

export default FieldContainer
