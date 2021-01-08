import React, {
  useReducer,
  useCallback,
  useImperativeHandle,
  useEffect,
} from 'react'
import {
  Drawer,
  Form,
  Input,
  Avatar,
  Button,
  DatePicker,
  Radio,
  Select,
} from 'antd'
import stateReducer from '@components/commonFun/stateReducer'
import { useSelector, useDispatch } from 'react-redux'
import { addUser, getUserById, updateUser } from '@actions/user'
import * as moment from 'moment'
import { getAllPermisson } from '@actions/permission'
import SeachGroup from './searchGroup'
import { Loading } from '@components'

const { Option } = Select
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

function UserForm({ drawerRef }) {
  const isSuccess = useSelector((state) => state.user.isSuccess)
  const isLoading = useSelector((state) => state.user.isLoading)
  const permission = useSelector((state) => state.permission.permission)
  const userById = useSelector((state) => state.user.userById)
  const dispatch = useDispatch()
  const [state, setState] = useReducer(stateReducer, {
    visible: false,
    idUser: null,
    imageSrc: '',
    requiredPass: false,
  })
  const [form] = Form.useForm()
  const { visible, idUser, imageSrc, requiredPass } = state
  useImperativeHandle(drawerRef, () => ({
    handleOpen,
  }))
  useEffect(() => {
    dispatch(getAllPermisson())
  }, [])
  useEffect(() => {
    if (isSuccess) {
      setState({
        visible: false,
      })
    }
  }, [isSuccess])
  useEffect(() => {
    if (userById) {
      const { birthday } = userById
      form.setFieldsValue({
        ...userById,
        birthday: moment(birthday),
      })
      setState({
        imageSrc: userById?.avatar,
      })
    }
  }, [userById])
  const handleOpen = useCallback((user = null) => {
    form.resetFields()
    setState({
      imageSrc: '',
      requiredPass: false,
    })
    if (user) {
      dispatch(getUserById(user?._id))
    }
    setState({
      visible: true,
      idUser: user?._id,
    })
  }, [])
  const onClose = useCallback(() => {
    setState({
      visible: false,
    })
  }, [])
  const avatarChange = useCallback(() => {
    const data = form.getFieldValue('avatar')
    setState({
      imageSrc: data,
    })
  }, [form])
  const onFinish = (values) => {
    const {
      name,
      password,
      email,
      phoneNumber,
      birthday,
      gender,
      idGroup,
      avatar,
      role,
    } = values
    if (!idUser) {
      dispatch(
        addUser({
          name,
          password,
          email,
          phoneNumber,
          birthday: moment(birthday).valueOf(),
          gender,
          idGroup,
          avatar,
          role,
        })
      )
    } else {
      dispatch(
        updateUser({
          _id: idUser,
          input: {
            name,
            password,
            email,
            phoneNumber,
            birthday: moment(birthday).valueOf(),
            gender,
            idGroup,
            avatar,
            role,
          },
        })
      )
    }
  }
  const changeRequiredConfirmPass = useCallback((value) => {
    if (value) {
      setState({
        requiredPass: true,
      })
    } else {
      setState({
        requiredPass: false,
      })
      form.validateFields(['password', 'confirmPassword'])
    }
  }, [])
  return (
    <Drawer
      title={idUser ? userById?.name : 'Thêm nhân viên'}
      placement='right'
      closable={false}
      onClose={onClose}
      width={520}
      visible={visible}
      getContainer={false}
      style={{ position: 'absolute' }}
    >
      {isLoading ? (
        <Loading />
      ) : (
          <Form
            form={form}
            {...layout}
            name='form-user'
            onFinish={onFinish}
            initialValues={{
              birthday: moment(),
              gender: 'MALE',
            }}
            draggable={false}
          >
            <Form.Item
              name='name'
              label='Tên nhân viên'
              rules={[{ required: true }]}
            >
              <Input placeholder='Nhập tên nhân viên' />
            </Form.Item>
            <Form.Item name='password' label='Mật khẩu'>
              <Input.Password
                placeholder='Nhập mật khẩu'
                onChange={changeRequiredConfirmPass}
              />
            </Form.Item>
            <Form.Item
              name='confirmPassword'
              label='Xác nhận mật khẩu'
              dependencies={['password']}
              rules={[
                {
                  required: !idUser || requiredPass,
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
              <Input.Password placeholder='Xác nhận mật khẩu' />
            </Form.Item>
            <Form.Item
              name='email'
              label='Email'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập địa chỉ email',
                },
                () => ({
                  validator(rule, value) {
                    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.exec(value)) {
                      return Promise.resolve()
                    }
                    return Promise.reject('Địa chỉ email nhập không đúng')
                  },
                }),
              ]}
            >
              <Input placeholder='Nhập email' />
            </Form.Item>
            <Form.Item name='phoneNumber' label='Số điện thoại'>
              <Input placeholder='Nhập số điện thoại' />
            </Form.Item>
            <Form.Item name='birthday' label='Ngày sinh'>
              <DatePicker placeholder='chọn ngày sinh' />
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
            <Form.Item name='role' label='Quyền hạn'>
              <Select>
                {permission.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.description}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name='avatar' label='Link ảnh đại diện'>
              <Input
                onChange={avatarChange}
                placeholder='Nhập link ảnh đại diện'
              />
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
                {idUser ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </Form.Item>
          </Form>
        )}
    </Drawer>
  )
}

export default React.memo(UserForm)
