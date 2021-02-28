import React, { useCallback, useRef } from 'react'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"
import './react-contextmenu.css'
import { FormOutlined, PlusOutlined, DeleteOutlined, CaretRightOutlined } from '@ant-design/icons'
import './index.scss'
import DangXuLy from '@assets/icon/dangXuLy.svg'
import HoanThanh from '@assets/icon/hoanThanh.svg'
import HuySuKien from '@assets/icon/huySuKien.svg'
import { useDispatch } from 'react-redux'
import { deleteEvent } from '@actions/event'

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
                  <li>
                    <img src={DangXuLy} />
                    <span>Đang diễn ra</span>
                  </li>
                  <li>
                    <img src={HoanThanh} />
                    <span>Đã hoàn thành</span>
                  </li>
                  <li>
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
