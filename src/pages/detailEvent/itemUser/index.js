import React from 'react'
import * as moment from 'moment'
import { Button } from 'antd'
import './index.scss'
import axiosClient from '@utils/axiosClient'
import { URL_API_DELETE_USER_EVENT, URL_API_REQUEST_JOIN_EVENT } from '@constants/apiUrl'
import { OpenNotification } from '@components/Notification'
import { withRouter } from 'react-router-dom'
import Avatar from 'antd/lib/avatar/avatar'

const objState = {
  REQUESTED: 'Đã yêu cầu tham gia',
  APPROVED: 'Đã tham gia',
  CANCELLED: 'Đã Hủy / đã xóa'
}

export default withRouter(function ItemUser(props) {
  const {
    event,
    modalRef,
    handleSearchClick,
    history
  } = props
  // const handleOpenModal = () => {
  //   modalRef.current?.openModal(event._id)
  // }
  // const handleDeleteUserEvent = async () => {
  //   try {
  //     const { data } = await axiosClient.delete(URL_API_DELETE_USER_EVENT, {
  //       params: { id: event.userEventByMe._id }
  //     })
  //     if (data) {
  //       OpenNotification({
  //         type: 'success',
  //         description: 'Hủy thành công',
  //         title: 'Thành công'
  //       })
  //       handleSearchClick()
  //     }
  //   } catch (error) {
  //     OpenNotification({
  //       type: 'error',
  //       description: error,
  //       title: 'Lỗi'
  //     })
  //   }
  // }
  // const handleRequestJoin = async () => {
  //   try {
  //     const { data } = await axiosClient.post(URL_API_REQUEST_JOIN_EVENT, { idEvent: event._id })
  //     if (data) {
  //       OpenNotification({
  //         type: 'success',
  //         description: 'Yêu cầu tham gia thành công',
  //         title: 'Thành công'
  //       })
  //       handleSearchClick()
  //     }
  //   } catch (error) {
  //     OpenNotification({
  //       type: 'error',
  //       description: error,
  //       title: 'Lỗi'
  //     })
  //   }
  // }
  // const handleActionWithEvent = () => {
  //   if (event?.userEventByMe?.state) {
  //     handleDeleteUserEvent()
  //   } else {
  //     handleRequestJoin()
  //   }
  // }
  // const handleViewDetail = () => {
  //   history.push(`/detailEvent/${event._id}`)
  // }
  return (
    <div className='item-user'>
      <div className='intro'>
        <Avatar size={78} className='avatar' src={`https://scontent.fdad1-1.fna.fbcdn.net/v/t1.0-9/142743166_2917583088489128_3169339497298041006_o.jpg?_nc_cat=100&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=4JEBCdQBbbUAX9-Lsr_&_nc_ht=scontent.fdad1-1.fna&oh=63194d3f711d7a835c9d1773d3aea42d&oe=606EFF78`} />
        <h3>Nhân viên 1</h3>
      </div>
      <div className='state'>
        <span className='state-title'>Trạng thái:</span>
        <span className='state-value'>Đã tham gia</span>
      </div>
      <div className='action'>
        <Button className='btn-action'>Xem chi tiết</Button>
        <Button className='btn-action'>Thêm nhân viên</Button>
      </div>
    </div>
  )
})
