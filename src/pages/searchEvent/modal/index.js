import React, {  forwardRef, useImperativeHandle, useReducer } from 'react'
import { Modal, Table, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getUserByEvent, approveUserToEvent, removeUserFromEvent, addUserToEvent, cancelUserRequest } from '@actions/event'
import { CloseCircleOutlined, CheckOutlined } from '@ant-design/icons'
import stateReducer from '@components/commonFun/stateReducer'

const objState = {
  REQUESTED: 'Đã yêu cầu',
  APPROVED: 'Đã tham gia',
  CANCELLED: 'Đã Hủy yêu cầu'
}

export default forwardRef((props, ref) =>  {
  const [state, setState] = useReducer(stateReducer, {
    visible: false,
    idEvent: null
  })
  const { visible, idEvent } = state
  const dispatch = useDispatch()
  const userByEvent = useSelector(state => state.event.userByEvent)
  const openModal = (idEvent) => {
    console.log(idEvent)
    dispatch(
      getUserByEvent({ idEvent })
    )
    setState({
      visible: true,
      idEvent
    })
  }
  useImperativeHandle(ref, () => ({
    openModal
  }))
  const handleApproveUser = (idUser) => {
    dispatch(
      approveUserToEvent({
        idEvent,
        idUser
      })
    )
  }
  const handleRemoveUser = (idUser) => {
    dispatch(
      removeUserFromEvent({
        idEvent,
        idUser
      })
    )
  }
  const handleAddUser = (idUser) => {
    dispatch(
      addUserToEvent({
        idEvent,
        idUser
      })
    )
  }
  const handleCancelUserRequest = (idUser) => {
    dispatch(
      cancelUserRequest({
        idEvent,
        idUser
      })
    )
  }
  const columns = [
    {
      title: 'Tên nhân viên',
      dataIndex: 'name',
      sorter: (a, b) => a.name - b.name,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email - b.email,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Trạng thái',
      dataIndex: 'state',
      render: (_, record) => (
        <span>
          {objState[record.userEvent?.state] || 'Không xác định'}
        </span>
      ),
      sorter: (a, b) => objState[a.userEvent?.state] - objState[b.userEvent?.state],
      sortDirections: ['descend', 'ascend']
    },
    {
      key: 'action',
      width: 310,
      render: (_, record) => (
        <div className='button-action'>
          {record.userEvent?.state === 'APPROVED' ? (
            <Button danger onClick={() => handleRemoveUser(record._id)}>
              <CloseCircleOutlined />
              Xóa khỏi sự kiện
            </Button>
          ) : record.userEvent?.state === 'REQUESTED' ? (
            <>
              <Button type="primary" style={{ marginRight: 5 }} onClick={() => handleApproveUser(record._id)}>
                <CheckOutlined />
                Duyệt yêu cầu
              </Button>
              <Button danger onClick={() => handleCancelUserRequest(record._id)}>
                <CloseCircleOutlined />
                Xóa yêu cầu
              </Button>
            </>
          ) : (
            <Button type="primary" onClick={() => handleAddUser(record._id)}>
              <CheckOutlined />
              Thêm vào sự kiện
            </Button>
          )}
        </div>
      )
    }
  ]
  
  return (
    <Modal
      title='Nhân viên tham gia sự kiện'
      width='80vw'
      cancelText='Đóng'
      onCancel={() => setState({ visible: false, idEvent: null })}
      visible={visible}
      okButtonProps={{
        hidden: true
      }}
    >
      <Table columns={columns} dataSource={userByEvent} pagination={{ pageSize: 10 }} rowKey='_id' />
    </Modal>
  )
})
