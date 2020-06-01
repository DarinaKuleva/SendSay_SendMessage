import React from 'react'
import SendMessage from '../containers/SendMessage'
import MessageHistory from '../components/MessageHistory'
import './App.scss'

const App = () => {
  return (
    <section className='App'>
      <SendMessage/>
      <MessageHistory/>
    </section>
  )
}

export default App
