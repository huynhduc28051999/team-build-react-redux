import React from 'react'
import * as moment from 'moment'
import './customItemEvent.scss'
import { Avatar } from 'antd'
import DangXuLy from '@assets/icon/dangXuLy.svg'
import HoanThanh from '@assets/icon/hoanThanh.svg'
import HuySuKien from '@assets/icon/huySuKien.svg'

const objState = {
  PROCESSING: {
    src: DangXuLy,
    name: 'Đang diễn ra'
  },
  COMPLETED: {
    src: HoanThanh,
    name: 'Đã hoàn thành'
  },
  CANCELLED: {
    src: HuySuKien,
    name: 'Đã hoàn thành'
  }
}

const CustomItemEvent = props => {
  return (
    <div id={props.evtProps.event._id}>
      <img style={{ marginRight: 5 }} src={objState[props?.evtProps.event?.state]?.src} />
      <Avatar size={20} src={props.evtProps.event.avatar} />
      &nbsp;
      <span id='test'>
        <span>
          <b>{props.evtProps.event.name || 'Không xác định'}</b>
          {props.selectedViewDateRef.current === 'day' ? (
            <>
              <p>Thời gian bắt đầu: {moment(props?.evtProps.event?.date).format('HH:mm')}</p>
              <p>Mô tả sự kiện: {props?.evtProps.event?.description}</p>
              <p>Trạng thái: {objState[props?.evtProps.event?.state]?.name}</p>
            </>
          ) : (<br />)}
        </span>
      </span>
    </div>
  )
}
export default React.memo(CustomItemEvent)
