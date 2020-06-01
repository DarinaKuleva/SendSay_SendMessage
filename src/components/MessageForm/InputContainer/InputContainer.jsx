import * as React from 'react'
import { fieldLabels } from '../../../constants/messageForm'
import './InputContainer.scss'

const InputContainer = (props) => {
  const {children, name} = props

  return (
    <div className={'InputContainer'}>
      <label
        htmlFor={name}
        className={'InputContainer__label'}
      >
        {fieldLabels[name]}
      </label>
      <div className={'InputContainer__children'}>
        {children}
      </div>
    </div>
  )
}

export default InputContainer
