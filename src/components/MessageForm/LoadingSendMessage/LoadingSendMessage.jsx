import React from 'react'
import './LoadingSendMessage.scss'

const LoadingSendMessage = () => {
  return (
    <section className={'LoadingSendMessage'}>
      <h2 className={'LoadingSendMessage__title'}>
        Сообщение поставлено в очередь на отправку
      </h2>
      <p className={'LoadingSendMessage__desc'}>
        Совсем скоро сообщение вылетит из сервера, и будет двигаться в сторону почты получателя «abc@my.com» со скоростью электронов.
      </p>
    </section>
  )
}

export default LoadingSendMessage
