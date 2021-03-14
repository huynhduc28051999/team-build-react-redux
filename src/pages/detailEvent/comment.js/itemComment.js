import React from 'react'
import Avatar from 'antd/lib/avatar/avatar'

export default function ItemComment({ data }) {
  return (
    <div className='item-comment'>
      <div className='avatar'>
        <Avatar size={30} className='avatar' src={data?.user?.avatar} />
      </div>
      <div className='content-infor'>
        <div className='info-user'>
          <span>{data?.user?.name}</span>
        </div>
        <div className='comment-content'>
          {data.content}
        </div>
      </div>
    </div>
  )
}
