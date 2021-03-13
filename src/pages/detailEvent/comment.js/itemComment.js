import React from 'react'
import Avatar from 'antd/lib/avatar/avatar'

export default function ItemComment() {
  return (
    <div className='item-comment'>
      <div className='avatar'>
        <Avatar size={30} className='avatar' src={`https://scontent.fdad1-1.fna.fbcdn.net/v/t1.0-9/142743166_2917583088489128_3169339497298041006_o.jpg?_nc_cat=100&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=4JEBCdQBbbUAX9-Lsr_&_nc_ht=scontent.fdad1-1.fna&oh=63194d3f711d7a835c9d1773d3aea42d&oe=606EFF78`} />
      </div>
      <div className='content-infor'>
        <div className='info-user'>
          <span>Nhân viên 1</span>
        </div>
        <div className='comment-content'>
          Sáng sớm mọi người nên mặc áo ấm vào nhé
        </div>
      </div>
    </div>
  )
}
