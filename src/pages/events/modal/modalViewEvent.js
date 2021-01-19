import React, { useCallback, forwardRef, useImperativeHandle, useReducer } from 'react'
import { Modal, Form, Row, Col, Typography } from 'antd'
import stateReducer from '@components/commonFun/stateReducer'
import * as moment from 'moment'
import EventHistory from './eventHistory'
const { Text } = Typography
const ModalViewEvent = forwardRef((_, ref) => {
  const [state, setState] = useReducer(stateReducer, {
    visible: false,
    event: null
  })

  const {
    visible,
    event
  } = state

  const openModal = useCallback((value) => {
    setState({
      visible: true,
      event: value
    })
  }, [])
  useImperativeHandle(ref, () => ({
    openModal
  }))
  const handleCancel = () => {
    setState({
      visible: false
    })
  }
  return (
    <Modal
      title={event?.name}
      visible={visible}
      onCancel={handleCancel}
      cancelText='Đóng'
      okButtonProps={{
        hidden: true
      }}
      width={'80vw'}
    >
      <Form
        layout='vertical'
      >
        <Row>
          <Col span={8}>
            <Form.Item
              name='name'
              label='Tên sự kiện'
            >
              <Text>{event?.name}</Text>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name='idGroup'
              label='Phòng ban'
            >
              <Text>{event?.group?.name}</Text>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name='date'
              label='Thời gian bắt đầu'
            >
             <Text>{event?.date ? moment(event?.date).format('HH:mm DD/MM/YYYY') : ''}</Text>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name='duration'
              label='Thời lượng (Phút)'
            >
              <Text>{event?.duration}</Text>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name='createdAt'
              label='Tạo lúc'
            >
              <Text>{event?.createdAt ? moment(event?.createdAt).format('HH:mm DD/MM/YYYY') : ''}</Text>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={['createdBy', 'name']}
              label='Người tạo'
            >
              <Text>{event?.createdBy?.name}</Text>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name='description'
          label='Mô tả sự kiện'
        >
          <Text>{event?.description}</Text>
        </Form.Item>
      </Form>
      <EventHistory idEvent={event?._id} />
    </Modal>
  )
})

export default ModalViewEvent
