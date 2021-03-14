import React from 'react'
import Avatar from 'antd/lib/avatar/avatar'
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons'
import * as moment from 'moment'
import './eventInfo.scss'
import axiosClient from '@utils/axiosClient'
import { URL_API_MODIFY_VOTE } from '@constants/apiUrl'
import { useDispatch } from 'react-redux'
import { getEventById } from '@actions/event'
import { OpenNotification } from '@components/Notification'

const objState = {
  PROCESSING: 'Đang diễn ra',
  COMPLETED: 'Đã hoàn thành',
  CANCELLED: 'Đã Hủy'
}

export default function EventInformation({ event }) {
  const dispatch = useDispatch()
  const handleModifyVote = async (type) => {
    try {
      const { data } = await axiosClient.post(URL_API_MODIFY_VOTE, {
        idEvent: event._id,
        type
      })
      if (data) {
        OpenNotification({
          type: 'success',
          title: 'Thành công'
        })
        dispatch(
          getEventById({ _id: event._id })
        )
      }
    } catch (error) {
      OpenNotification({
        type: 'error',
        description: error,
        title: 'Lỗi'
      })
    }
  }
  return (
    <div className='event-info'>
      <div className='avatar-content'>
        <Avatar size={78} className='avatar' src={event?.avatar} />
        <div className='action'>
          <div>
            <LikeOutlined
              style={{
                fontSize: 40,
                marginRight: 10,
                color: event?.voteOfMe?.typeVote === 'LIKE' ? 'rgb(32, 120, 244)' : '#000'
              }}
              onClick={() => handleModifyVote('LIKE')}
            />
            <i>{event?.likeCount || 0}</i>
          </div>
          <div>
            <DislikeOutlined
              style={{
                fontSize: 40,
                color: event?.voteOfMe?.typeVote === 'DISLIKE' ? 'rgb(32, 120, 244)' : '#000'
              }}
              onClick={() => handleModifyVote('DISLIKE')}
            />
            <i>{event?.dislikeCount || 0}</i>
          </div>
        </div>
      </div>
      <div className='event-info-content'>
        <table className='event-table'>
          <tbody>
            <tr>
              <td width='30%'>Tên sự kiện:</td>
              <td>{event?.name}</td>
            </tr>
            <tr>
              <td>Thời lượng:</td>
              <td>{`${event?.duration} Phút`}</td>
            </tr>
            <tr>
              <td>Phòng ban:</td>
              <td>{event?.group?.name}</td>
            </tr>
            <tr>
              <td>Trạng thái:</td>
              <td>{objState[event?.state]}</td>
            </tr>
            <tr>
              <td>Ngày tạo:</td>
              <td>{moment(event?.createdAt).format('DD/MM/YYYY HH:mm')}</td>
            </tr>
            <tr>
              <td>Thời gian bắt đầu:</td>
              <td>{moment(event?.date).format('DD/MM/YYYY HH:mm')}</td>
            </tr>
            <tr>
              <td>Người tạo:</td>
              <td>{event?.createdBy?.name}</td>
            </tr>
            <tr>
              <td>Mô tả sự kiện:</td>
              <td>{event?.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
