import React, { useReducer, useCallback, useImperativeHandle, useEffect } from 'react'
import stateReducer from '@components/commonFun/stateReducer'
import Modal from 'antd/lib/modal/Modal'
import { Button, Form, Input } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { changePassword } from '@actions/changePassword' 

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}

function ChangePassword({ modalRef }) {
  const loading = useSelector(state => state.me.isLoading)
  const isSuccess = useSelector(state => state.me.isSuccess)
  const dispatch = useDispatch()
  const [state, setState] = useReducer(stateReducer, {
    visible: false
  })
  const [form] = Form.useForm()

  const { visible } = state
  useEffect(() => {
    if (isSuccess) {
      closeModal()
    }
  }, [isSuccess])
  const handleChangePassword = (values) => {
    const { currentPassword, newPassword } = values
    dispatch(changePassword({ currentPassword, newPassword }))
  }
  const handleSubmit = () => {
    form.validateFields()
      .then(value => {
        handleChangePassword(value)
      })
  }
  const openModal = useCallback(() => {
    setState({
      visible: true
    })
  }, [])
  const closeModal = useCallback(() => {
    setState({
      visible: false
    })
    form.resetFields()
  }, [])
  useImperativeHandle(modalRef, () => ({
    openModal
  }))

  return (
    <Modal
      visible={visible}
      title='Change password'
      footer={[
        <Button key="back" onClick={closeModal}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
          >
          Lưu
        </Button>,
      ]}
    >
      <Form
        {...formItemLayout}
        form={form}
        name='form-change-password'
        onFinish={handleSubmit}
      >
        <Form.Item
          name='currentPassword'
          label='Mật khẩu cũ'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu cũ!'
            },
          ]}
        >
          <Input.Password
            placeholder='Nhập mật khẩu cũ'
          />
        </Form.Item>
        <Form.Item
          name='newPassword'
          label='Mật khẩu mới'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu mới!'
            },
          ]}
        >
          <Input.Password
            placeholder='Nhập mật khẩu mới'
          />
        </Form.Item>
        <Form.Item
          name='confirmPassword'
          label='Xác nhận mật khẩu mới'
          dependencies={['newPassword']}
          rules={[
            {
              required: true,
              message: 'Vui lòng xác nhận mật khẩu mới',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }
                return Promise.reject('Xác nhận mật khẩu mới không khớp')
              },
            }),
          ]}
        >
          <Input.Password
            placeholder='Xác nhận mật khẩu mới'
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ChangePassword
