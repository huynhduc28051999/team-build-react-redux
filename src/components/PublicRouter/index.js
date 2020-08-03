import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'

export const PublicRoute = props => {
  const {
    isAuth,
    children
  } = props
  if (isAuth) return <Redirect to='/home'/>
  return <Fragment>{children}</Fragment>
}
