import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'

export const PublicRoute = props => {
  const {
    isAuth,
    children
  } = props
  // eslint-disable-next-line
  if (isAuth) return <Redirect to='/home'/>
  return <Fragment>{children}</Fragment>
}
