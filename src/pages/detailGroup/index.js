import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

function DetailGroup(props) {
  const {
    match,
    history
  } = props
  useEffect(() => {
    if (!match.params._id) {
      history.goBack()
    }
  }, [])
  return (
    <div>
      ádsd
    </div>
  )
}

export default DetailGroup
