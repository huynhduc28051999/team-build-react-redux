import React, { useCallback, useState, useEffect } from 'react'
import { Form, Input, Button, Radio, Avatar, DatePicker } from 'antd'
import { Loading } from '@components'
import * as moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { changeProfileContruction } from '@actions/me'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 8 },
}

function Profile(props) {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.me.isLoading)
  const {
    me
  } = props
  const [form] = Form.useForm()
  const [imageSrc, setImageSrc] = useState()
  useEffect(() => {
    if (me._id) {
      const {
        gender,
        avatar,
        name,
        email,
        phoneNumber,
        birthday
      } = me
      form.setFieldsValue({
        gender,
        avatar,
        name,
        email,
        phoneNumber,
        birthday: moment(birthday) || moment()
      })
      setImageSrc(avatar)
    }
  }, [me])
  const onFinish = values => {
    const {
      name,
      birthday,
      gender,
      phoneNumber,
      avatar
    } = values
    dispatch(changeProfileContruction({
      name,
      birthday: birthday ? moment(birthday).valueOf() : moment().valueOf(),
      gender,
      phoneNumber,
      avatar
    }))
  }
  const avatarChange = useCallback(
    () => {
      const data = form.getFieldValue('avatar')
      setImageSrc(data)
    },
    [form]
  )
  return (
    <>
      {!me._id ? (
        <Loading />
      ) : (

          <Form form={form} {...layout} name='form-user' onFinish={onFinish}>
            <Form.Item name='name' label='Tên' rules={[{ required: true }]}>
              <Input placeholder='Nhập tên muốn hiển thị' />
            </Form.Item>
            <Form.Item name='email' label='Email' rules={[{ type: 'email', required: true }]}>
              <Input disabled />
            </Form.Item>
            <Form.Item name='birthday' label='Ngày sinh' rules={[{ required: true }]}>
              <DatePicker placeholder='Chọn ngày sinh' format='DD/MM/YYYY' />
            </Form.Item>
            <Form.Item name='gender' label='Giới tính' rules={[{ required: true }]}>
              <Radio.Group>
                <Radio value='MALE'>Nam</Radio>
                <Radio value='FEMALE'>Nữ</Radio>
                <Radio value='ORTHER'>Khác</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name='phoneNumber'
              label='Số điện thoại'
              rules={[
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (value && /^(09|03)+([0-9]{8})$/.test(value)) {
                      return Promise.resolve()
                    }
                    if (!value) return Promise.resolve()
                    return Promise.reject('Định dạng số điện thoại không khớp!')
                  },
                }),
              ]}
              >
              <Input placeholder='Nhập số điện thoại' />
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
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type='primary' htmlType='submit' loading={isLoading}>
                Cập nhật
          </Button>
            </Form.Item>
          </Form>
        )}
    </>
  )
}

export default Profile
