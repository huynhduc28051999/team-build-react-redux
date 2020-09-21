import React from 'react'
import LoginForm from './loginForm'
import './index.scss'

export default function Login({ history }) {
  return (
    <div className='wrapper'>
      <div className="logo" />
      <LoginForm history={history}/>
    </div>
  )
}
