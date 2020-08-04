import React, { useReducer, useCallback, useImperativeHandle, useEffect } from 'react'
import { Drawer, Form, Input, Avatar, Button, Spin, DatePicker, Radio } from 'antd'
import stateReducer from '@components/commonFun/stateReducer'
import { useSelector, useDispatch } from 'react-redux'
import { addGroup, getGroupById, updateGroup } from '@actions/group'
import { Loading } from '@components'
import * as moment from 'moment'
import SeachGroup from './searchGroup'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

function UserForm({ drawerRef }) {
  const isSuccess = useSelector(state => state.group.isSuccess)
  const isLoading = useSelector(state => state.group.isLoading)
  const dispatch = useDispatch()
  const groupById = useSelector(state => state.group.groupById)
  const [state, setState] = useReducer(stateReducer, {
    visible: false,
    idGroup: null,
    imageSrc: ''
  })
  const [form] = Form.useForm()
  const { visible, idGroup, imageSrc } = state
  useImperativeHandle(drawerRef, () => ({
    handleOpen
  }))
  useEffect(() => {
    if (isSuccess) {
      setState({
        visible: false
      })
    }
  }, [isSuccess])
  useEffect(() => {
    if (groupById) {
      form.setFieldsValue({
        name: groupById?.name,
        description: groupById?.description,
        avatar: groupById?.avatar
      })
      setState({
        imageSrc: groupById?.avatar
      })
    }
  }, [groupById])
  const handleOpen = useCallback((group = null) => {
    form.resetFields()
    setState({
      imageSrc: ''
    })
    if (group) {
      dispatch(getGroupById(group?._id))
    }
    setState({
      visible: true,
      idGroup: group?._id
    })
  }, [])
  const onClose = useCallback(() => {
    setState({
      visible: false
    })
  }, [])
  const avatarChange = useCallback(
    () => {
      const data = form.getFieldValue('avatar')
      setState({
        imageSrc: data
      })
    },
    [form]
  )
  const onFinish = values => {
    if (!idGroup) {
      dispatch(addGroup(values))
    } else {
      dispatch(
        updateGroup(
          { _id: idGroup, input: values }
        )
      )
    }
  }
  return (
    <Drawer
      title={idGroup ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên'}
      placement="right"
      closable={false}
      onClose={onClose}
      width={520}
      visible={visible}
      getContainer={false}
      style={{ position: 'absolute' }}
    >
      <Spin spinning={isLoading} />
      <Form form={form} {...layout} name='form-user' onFinish={onFinish}>
        <Form.Item name='name' label='Tên nhân viên' rules={[{ required: true }]}>
          <Input placeholder='Nhập tên nhân viên' />
        </Form.Item>
        <Form.Item name='password' label='Mật khẩu'>
          <Input.Password placeholder='Nhập mật khẩu' />
        </Form.Item>
        <Form.Item
          name='confirmPassword'
          label='Xác nhận mật khẩu'
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Vui lòng xác nhận mật khẩu mới',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject('Xác nhận mật khẩu không khớp')
              },
            }),
          ]}
        >
          <Input.Password
            placeholder='Xác nhận mật khẩu'
          />
        </Form.Item>
        <Form.Item name='email' label='Email'>
          <Input placeholder='Nhập email' />
        </Form.Item>
        <Form.Item name='phoneNumber' label='Số điện thoại'>
          <Input placeholder='Nhập số điện thoại' />
        </Form.Item>
        <Form.Item name='birthday' label='Ngày sinh'>
          <DatePicker defaultValue={moment()} placeholder='chọn ngày sinh' />
        </Form.Item>
        <Form.Item name='gender' label='Giới tính'>
          <Radio.Group>
            <Radio value='MALE'>Nam</Radio>
            <Radio value='FEMALE'>Nữ</Radio>
            <Radio value='ORTHER'>Khác</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name='idGroup' label='Phòng ban'>
          <SeachGroup />
        </Form.Item>
        <Form.Item name='avatar' label='Link ảnh đại diện'>
          <Input onChange={avatarChange} placeholder='Nhập link ảnh đại diện' />
        </Form.Item>
        <Form.Item
          dependencies={['avatar']}
          name='images'
          label='Ảnh đại diện'
        >
          <Avatar src={imageSrc} size={128} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
          <Button type='primary' htmlType='submit' loading={isLoading}>
            {idGroup ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default React.memo(UserForm)
