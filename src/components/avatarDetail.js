import React from 'react'
import { Avatar } from 'antd'

function AvatarDetail(props) {
  const { data } = props
  return (
    <Avatar size={32} src={data.avatar} />
  )
}

export default AvatarDetail
