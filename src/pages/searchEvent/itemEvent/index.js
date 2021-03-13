import React from 'react'
import * as moment from 'moment'
import { Button } from 'antd'
import './index.scss'
import axiosClient from '@utils/axiosClient'
import { URL_API_DELETE_USER_EVENT, URL_API_REQUEST_JOIN_EVENT } from '@constants/apiUrl'
import { OpenNotification } from '@components/Notification'
import { withRouter } from 'react-router-dom'

const objState = {
  PROCESSING: 'Đang diễn ra',
  COMPLETED: 'Đã hoàn thành',
  CANCELLED: 'Đã Hủy'
}

export default withRouter(function ItemEvent(props) {
  const {
    event,
    modalRef,
    handleSearchClick,
    history
  } = props
  const handleOpenModal = () => {
    modalRef.current?.openModal(event._id)
  }
  const handleDeleteUserEvent = async () => {
    try {
      const { data } = await axiosClient.delete(URL_API_DELETE_USER_EVENT, {
        params: { id: event.userEventByMe._id }
      })
      if (data) {
        OpenNotification({
          type: 'success',
          description: 'Hủy thành công',
          title: 'Thành công'
        })
        handleSearchClick()
      }
    } catch (error) {
      OpenNotification({
        type: 'error',
        description: error,
        title: 'Lỗi'
      })
    }
  }
  const handleRequestJoin = async () => {
    try {
      const { data } = await axiosClient.post(URL_API_REQUEST_JOIN_EVENT, { idEvent: event._id })
      if (data) {
        OpenNotification({
          type: 'success',
          description: 'Yêu cầu tham gia thành công',
          title: 'Thành công'
        })
        handleSearchClick()
      }
    } catch (error) {
      OpenNotification({
        type: 'error',
        description: error,
        title: 'Lỗi'
      })
    }
  }
  const handleActionWithEvent = () => {
    if (event?.userEventByMe?.state) {
      handleDeleteUserEvent()
    } else {
      handleRequestJoin()
    }
  }
  const handleViewDetail = () => {
    history.push(`/detailEvent/${event._id}`)
  }
  return (
    <div className='item-event'>
      <div className='intro'>
        <h3>{event.name}</h3>
        <span className='event-date'>{moment(event.date).format('DD/MM/YYYY HH:MM A')}</span>
      </div>
      <div className='state'>
        <span className='state-title'>Trạng thái:</span>
        <span className='state-value'>{objState[event.state]}</span>
      </div>
      <div className='action'>
        <Button className='btn-action' onClick={handleViewDetail}>Xem chi tiết</Button>
        {event?.userEventByMe?.state !== 'CANCELLED' && (
          <Button className='btn-action' onClick={handleActionWithEvent} >
            {event?.userEventByMe?.state === 'APPROVED'
              ? 'Hủy tham gia'
              : event?.userEventByMe?.state === 'REQUESTED'
                ? 'Hủy yêu cầu'
                : 'Yêu cầu tham gia'
            }
          </Button>
        )}
        <Button className='btn-action' onClick={handleOpenModal}>Thêm nhân viên</Button>
      </div>
    </div>
  )
})
