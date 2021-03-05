import React, { useRef } from 'react'
import * as moment from 'moment'
import { Button } from 'antd'
import './index.scss'

const objState = {
  PROCESSING: 'Đang diễn ra',
  COMPLETED: 'Đã hoàn thành',
  CANCELLED: 'Đã Hủy'
}

export default function ItemEvent(props) {
  const {
    event,
    modalRef
  } = props
  const handleOpenModal = () => {
    modalRef.current?.openModal(event._id)
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
        <Button className='btn-action'>Xem chi tiết</Button>
        <Button className='btn-action'>Yêu cầu tham gia</Button>
        <Button className='btn-action' onClick={handleOpenModal}>Thêm nhân viên</Button>
      </div>
    </div>
  )
}
