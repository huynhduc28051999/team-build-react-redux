import React from 'react'
import Dashboard from './dashboard'

export default function Home(props) {
  return (
    <Dashboard history={props.history} permission={props.permission} me={props.me}/>
  )
}
