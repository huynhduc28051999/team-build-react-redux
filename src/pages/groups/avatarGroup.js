import React from 'react'
import { Avatar } from 'antd'

function AvatarGroup(props) {
  const { data } = props
  return (
    <Avatar size={32} src={data.avatar} />
  )
}

export default AvatarGroup
