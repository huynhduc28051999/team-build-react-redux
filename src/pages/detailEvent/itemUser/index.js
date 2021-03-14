import React from 'react'
import { Button } from 'antd'
import './index.scss'
import axiosClient from '@utils/axiosClient'
import {
  URL_API_APPROVE_USER_TO_EVENT,
  URL_API_REMOVE_USER_FROM_EVENT,
} from '@constants/apiUrl'
import { OpenNotification } from '@components/Notification'
import { withRouter } from 'react-router-dom'
import Avatar from 'antd/lib/avatar/avatar'
import { useDispatch } from 'react-redux'
import { getEventById } from '@actions/event'

const objState = {
  REQUESTED: 'Đã yêu cầu',
  APPROVED: 'Đã tham gia',
  CANCELLED: 'Đã Hủy yêu cầu',
}
export default withRouter(function ItemUser(props) {
  const { idEvent } = props
  const dispatch = useDispatch()
  const { user } = props
  const handleApproveUser = async () => {
    try {
      const { data } = await axiosClient.post(URL_API_APPROVE_USER_TO_EVENT, {
        idEvent,
        idUser: user._id,
      })
      if (data) {
        OpenNotification({
          type: 'success',
          title: 'Thành công',
        })
        dispatch(getEventById({ _id: idEvent }))
      }
    } catch (error) {
      OpenNotification({
        type: 'error',
        description: error,
        title: 'Lỗi',
      })
    }
  }
  const handleRemoveUser = async () => {
    try {
      const { data } = await axiosClient.post(URL_API_REMOVE_USER_FROM_EVENT, {
        _id: idEvent,
        idUser: user._id,
      })
      if (data) {
        OpenNotification({
          type: 'success',
          title: 'Thành công',
        })
        dispatch(getEventById({ _id: idEvent }))
      }
    } catch (error) {
      OpenNotification({
        type: 'error',
        description: error,
        title: 'Lỗi',
      })
    }
  }
  return (
    <div className="item-user">
      <div className="intro">
        <Avatar size={78} className="avatar" src={user.avatar} />
        <h3>{user.name}</h3>
      </div>
      <div className="state">
        <span className="state-title">Trạng thái:</span>
        <span className="state-value">{objState[user.userEvent?.state]}</span>
      </div>
      <div className="action">
        {props.permission?.code === 'MANAGER' && (
          <>
            {user.userEvent?.state === 'REQUESTED' && (
              <Button className="btn-action" onClick={handleApproveUser}>
                Duyệt yêu cầu
              </Button>
            )}
            {(user.userEvent?.state === 'REQUESTED' ||
              user.userEvent?.state === 'APPROVED') && (
              <Button className="btn-action" onClick={handleRemoveUser}>Xóa khỏi sự kiện</Button>
            )}
          </>
        )}
      </div>
    </div>
  )
})
