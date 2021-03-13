import React, { useRef } from 'react'
import ItemComment from './itemComment'
import './index.scss'
import { Input } from 'antd'
import { SendOutlined } from '@ant-design/icons'

export default function Comment() {
  const inputRef = useRef()
  return (
    <div className='comment-container'>
      <div className='commnented'>
        <ItemComment />
        <ItemComment />
        <ItemComment />
        <ItemComment />
        <ItemComment />
      </div>
      <div className='action'>
        <Input
          placeholder='Nhập bình luận'
          ref={inputRef}
          addonAfter={<SendOutlined style={{ cursor: 'pointer' }} />}
        />
      </div>
    </div>
  )
}
