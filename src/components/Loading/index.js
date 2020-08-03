import React from 'react'
import { Spin } from 'antd'
import './index.scss'

export const Loading = () => {
  return (
    <div className='loading'>
      <Spin size='large' />
    </div>
  )
}
