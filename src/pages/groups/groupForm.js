import React, { useReducer, useCallback, useImperativeHandle, useEffect } from 'react'
import { Drawer, Form, Input, Avatar, Button, Spin } from 'antd'
import stateReducer from '@components/commonFun/stateReducer'
import { useSelector, useDispatch } from 'react-redux'
import { addGroup, getGroupById, updateGroup } from '@actions/group'
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

function GroupForm({ drawerRef }) {
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
      title={idGroup ? 'Chỉnh sửa phòng ban' : 'Thêm phòng ban'}
      placement="right"
      closable={false}
      onClose={onClose}
      width={520}
      visible={visible}
      getContainer={false}
      style={{ position: 'absolute' }}
    >
      <Spin spinning={isLoading} />
      <Form form={form} {...layout} name='form-group' onFinish={onFinish}>
        <Form.Item name='name' label='Tên nhóm' rules={[{ required: true }]}>
          <Input placeholder='Nhập tên nhóm hiển thị' />
        </Form.Item>
        <Form.Item name='description' label='Mô tả thông tin'>
          <Input.TextArea rows={5} placeholder='Nhập thông tin mô tả' />
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

export default React.memo(GroupForm)
