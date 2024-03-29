import React from 'react'
import { Redirect } from 'react-router-dom'
import Layout from '@pages/layout'

export const PrivateRoute = props => {
  const {
    isAuth,
    history,
    children
  } = props
  // eslint-disable-next-line
  if (!isAuth) return (<Redirect to='/login' />)
  return (
    <Layout history={history} children={children}/>
  )
}
