import React, { useCallback, useRef } from 'react'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"
import './react-contextmenu.css'
import { FormOutlined, PlusOutlined, DeleteOutlined, CaretRightOutlined } from '@ant-design/icons'
import './index.scss'
import DangXuLy from '@assets/icon/dangXuLy.svg'
import HoanThanh from '@assets/icon/hoanThanh.svg'
import HuySuKien from '@assets/icon/huySuKien.svg'
import { useDispatch } from 'react-redux'
import { deleteEvent, completeEvent, cancelEvent, reopenEvent } from '@actions/event'
import { OpenNotification } from '@components/Notification'

export default React.memo(props => {
  const dispatch = useDispatch()
  const {
    evtWrapperProps,
    handleClickAdd,
    onSelectEvent
  } = props
  const handleRightClick = useCallback((e) => {
    if (e) e.preventDefault()
  }, [])
  const handleDeleteEvent = (e, _id) => {
    if (e) e.preventDefault()
    dispatch(
      deleteEvent({
        ids: [_id]
      })
    )
  }
  const handleCompleteEvent = (event) => {
    if (event.state === 'COMPLETED') {
      OpenNotification({
        type: 'error',
        description: 'Không thể chỉnh sửa lịch hẹn đã hoàn thành',
        title: 'Lỗi!'
      })
      return
    }
    dispatch(
      completeEvent({
        _id: event._id
      })
    )
  }
  const handleCancelEvent = (event) => {
    if (event.state === 'COMPLETED') {
      OpenNotification({
        type: 'error',
        description: 'Không thể chỉnh sửa lịch hẹn đã hoàn thành',
        title: 'Lỗi!'
      })
      return
    }
    dispatch(
      cancelEvent({
        _id: event._id
      })
    )
  }

  const handleReopenEvent = (event) => {
    if (event.state !== 'CANCELLED') {
      OpenNotification({
        type: 'error',
        description: 'Sự kiện không phải ở trạng thái đã hủy',
        title: 'Lỗi!'
      })
      return
    }
    dispatch(
      reopenEvent({
        _id: event._id
      })
    )
  }
  return (
    <span id={evtWrapperProps.event._id} onContextMenu={handleRightClick} className='wrapper-event'>
      <ContextMenuTrigger id={evtWrapperProps.event._id}>
        {evtWrapperProps.children}
      </ContextMenuTrigger>

      <ContextMenu id={evtWrapperProps.event._id}>
        <MenuItem onClick={handleClickAdd}>
          <div className='action-master'>
            <PlusOutlined />
            <span>Thêm sự kiện</span>
          </div>
        </MenuItem>
        <MenuItem onClick={() => onSelectEvent(evtWrapperProps.event)}>
          <div className='action-master'>
            <FormOutlined />
            <span>Chỉnh sửa sự kiện</span>
          </div>
        </MenuItem>
        <MenuItem data={{ foo: 'bar' }} onClick={(e) => handleDeleteEvent(e, evtWrapperProps.event._id)}>
          <div className='action-master'>
            <DeleteOutlined />
            <span>Xóa sự kiện</span>
          </div>
        </MenuItem>
        <MenuItem divider />
          <MenuItem>
            <div className='action-master-reverse'>
              <span />
              <span>Thay đổi trạng thái</span>
              <CaretRightOutlined />
              <div className='list-option-change'>
                <ul>
                  <li onClick={() => handleReopenEvent(evtWrapperProps.event)}>
                    <img src={DangXuLy} />
                    <span>Đang diễn ra</span>
                  </li>
                  <li onClick={() => handleCompleteEvent(evtWrapperProps.event)}>
                    <img src={HoanThanh} />
                    <span>Đã hoàn thành</span>
                  </li>
                  <li onClick={() => handleCancelEvent(evtWrapperProps.event)}>
                    <img src={HuySuKien} />
                    <span>Hủy sự kiện</span>
                  </li>
                </ul>
              </div>
            </div>
          </MenuItem>
      </ContextMenu>
    </span>
  )
})
