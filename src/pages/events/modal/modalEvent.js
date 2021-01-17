import React, { useCallback, forwardRef, useImperativeHandle, useReducer, useEffect } from 'react'
import { Modal, Form, Input, InputNumber, DatePicker, Row, Col } from 'antd'
import stateReducer from '@components/commonFun/stateReducer'
import * as moment from 'moment'
import SearchGroup from './searchGroup'
import { useDispatch, useSelector } from 'react-redux'
import { addEvent } from '@actions/event'

const ModalEvent = forwardRef((_, ref) => {
  const dispatch = useDispatch()
  const isSuccess = useSelector(state => state.event.isSuccess)
  const isLoading = useSelector(state => state.event.isLoading)
  const [state, setState] = useReducer(stateReducer, {
    visible: false,
    event: null
  })
  const [form] = Form.useForm()

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
  const onOk = useCallback(() => {
    form.validateFields().then(values => {
      dispatch(
        addEvent({
          ...values,
          date: moment(values.date).valueOf()
        })
      )
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
  useEffect(() => {
    if (isSuccess) {
      setState({
        visible: false
      })
    }
  }, [isSuccess])
  return (
    <Modal
      title={event?.name || 'Sự kiện mới'}
      visible={visible}
      onOk={onOk}
      onCancel={handleCancel}
      okText='Lưu'
      cancelText='Hủy'
      okButtonProps={{
        loading: isLoading
      }}
      cancelButtonProps={{
        disabled: isLoading
      }}
    >
      <Form
        form={form}
        initialValues={{
          duration: 60,
          date: moment()
        }}
        layout='vertical'
      >
        <Form.Item
          name='name'
          label='Tên sự kiện'
          rules={[
            {
              required: true,
              message: 'Tên sự kiện không được để trống'
            }
          ]}
        >
          <Input placeholder='Nhập tên sự kiện' />
        </Form.Item>
        <Form.Item
          name='idGroup'
          label='Phòng ban'
          rules={[
            {
              required: true,
              message: 'Phòng ban không được để trống'
            }
          ]}
        >
          <SearchGroup />
        </Form.Item>
        <Form.Item
          name='description'
          label='Mô tả sự kiện'
        >
          <Input.TextArea rows={5} placeholder='Nhập mô tả sự kiện' />
        </Form.Item>
        <Form.Item
          name='avatar'
          label='Link ảnh đại diện'
          rules={[
            {
              required: true,
              message: 'Link ảnh đại diện không được để trống'
            }
          ]}
        >
          <Input placeholder='Nhập mô tả sự kiện' />
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item
              name='date'
              label='Thời gian bắt đầu'
            >
              <DatePicker allowClear={false} showTime placeholder='Thời gian bắt đầu' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='duration'
              label='Thời lượng (Phút)'
            >
              <InputNumber style={{ width: '100%' }} placeholder='Nhập thời lượng' />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
})

export default ModalEvent
