import React from 'react'
import Avatar from 'antd/lib/avatar/avatar'
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons'
import './eventInfo.scss'

export default function EventInformation() {
  return (
    <div className='event-info'>
      <div className='avatar-content'>
        <Avatar size={78} className='avatar' src={`https://scontent.fdad1-1.fna.fbcdn.net/v/t1.0-9/142743166_2917583088489128_3169339497298041006_o.jpg?_nc_cat=100&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=4JEBCdQBbbUAX9-Lsr_&_nc_ht=scontent.fdad1-1.fna&oh=63194d3f711d7a835c9d1773d3aea42d&oe=606EFF78`} />
        <div className='action'>
          <LikeOutlined style={{ fontSize: 40, marginRight: 10 }} />
          <DislikeOutlined style={{ fontSize: 40 }} />
        </div>
      </div>
      <div className='event-info-content'>
        <table className='event-table'>
          <tr>
            <td width='30%'>Tên sự kiện:</td>
            <td>Sự kiện 1</td>
          </tr>
          <tr>
            <td>Thời lượng:</td>
            <td>45 Phút</td>
          </tr>
          <tr>
            <td>Phòng ban:</td>
            <td>Phòng ban 1</td>
          </tr>
          <tr>
            <td>Ngày tạo:</td>
            <td>28/05/1999 12:12</td>
          </tr>
          <tr>
            <td>Thời gian bắt đầu:</td>
            <td>28/05/1999 12:12</td>
          </tr>
          <tr>
            <td>Người tạo:</td>
            <td>Lý Huỳnh Đức</td>
          </tr>
          <tr>
            <td>Mô tả sự kiện:</td>
            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Inventore, eveniet nobis hic placeat dolor iusto! Adipisci quas soluta optio nam fuga assumenda quos! Inventore hic, eligendi iure voluptatibus velit doloremque.</td>
          </tr>
        </table>
      </div>
    </div>
  )
}
