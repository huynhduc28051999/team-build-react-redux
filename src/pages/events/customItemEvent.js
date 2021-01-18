import React from 'react'
import * as moment from 'moment'
import './customItemEvent.scss'
import { Avatar } from 'antd'

const objState = {
  PROCESSING: 'Đang diễn ra',
  APPROVED: 'Đã hoàn thành'
}

const CustomItemEvent = props => {
  return (
    <div id={props.evtProps.event._id}>
      <Avatar size={20} src={props.evtProps.event.avatar} />
      &nbsp;
      <span id='test'>
        <span>
          <b>{props.evtProps.event.name || 'Không xác định'}</b>
          {props.selectedViewDateRef.current === 'day' ? (
            <>
              <p>Thời gian bắt đầu: {moment(props?.evtProps.event?.date).format('HH:mm')}</p>
              <p>Mô tả sự kiện: {props?.evtProps.event?.description}</p>
              <p>Trạng thái: {objState[props?.evtProps.event?.state]}</p>
            </>
          ) : (<br />)}
        </span>
      </span>
    </div>
  )
}
export default React.memo(CustomItemEvent)
