import React, {
  useReducer,
  useCallback,
  useImperativeHandle,
  useEffect,
} from 'react'
import { Drawer, Form, Input, Avatar, Button, Image } from 'antd'
import stateReducer from '@components/commonFun/stateReducer'
import { useSelector, useDispatch } from 'react-redux'
import { addGroup, getGroupById, updateGroup } from '@actions/group'
import { Loading } from '@components'
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

function GroupForm({ drawerRef }) {
  const isSuccess = useSelector((state) => state.group.isSuccess)
  const isLoading = useSelector((state) => state.group.isLoading)
  const dispatch = useDispatch()
  const groupById = useSelector((state) => state.group.groupById)
  const [state, setState] = useReducer(stateReducer, {
    visible: false,
    idGroup: null,
    imageSrcAvatar: '',
    imageSrcBKG: '',
  })
  const [form] = Form.useForm()
  const { visible, idGroup, imageSrcAvatar, imageSrcBKG } = state
  useImperativeHandle(drawerRef, () => ({
    handleOpen,
  }))
  useEffect(() => {
    if (isSuccess) {
      setState({
        visible: false,
      })
    }
  }, [isSuccess])
  useEffect(() => {
    if (groupById) {
      form.setFieldsValue({
        name: groupById?.name,
        description: groupById?.description,
        avatar: groupById?.avatar,
        background: groupById?.background,
        title: groupById?.title
      })
      setState({
        imageSrcAvatar: groupById?.avatar,
        imageSrcBKG: groupById?.background,
      })
    }
  }, [groupById])
  const handleOpen = useCallback((group = null) => {
    form.resetFields()
    setState({
      imageSrcAvatar: '',
      imageSrcBKG: '',
    })
    if (group) {
      dispatch(getGroupById(group?._id))
    }
    setState({
      visible: true,
      idGroup: group?._id,
    })
  }, [])
  const onClose = useCallback(() => {
    setState({
      visible: false,
    })
  }, [])
  const avatarChange = useCallback(() => {
    const data = form.getFieldValue('avatar')
    const background = form.getFieldValue('background')
    setState({
      imageSrcAvatar: data,
      imageSrcBKG: background,
    })
  }, [form])
  const onFinish = (values) => {
    delete values.images
    delete values.imagesBackground
    if (!idGroup) {
      dispatch(addGroup(values))
    } else {
      dispatch(updateGroup({ _id: idGroup, input: values }))
    }
  }
  return (
    <Drawer
      title={idGroup ? groupById?.name : 'Thêm phòng ban'}
      placement="right"
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
        <Form form={form} {...layout} name="form-group" onFinish={onFinish}>
          <Form.Item name="name" label="Tên nhóm" rules={[{ required: true }]}>
            <Input placeholder="Nhập tên nhóm hiển thị" />
          </Form.Item>
          <Form.Item name="title" label="Tiêu đề cho nhóm">
            <Input.TextArea rows={2} placeholder="Nhập tiêu đề" />
          </Form.Item>
          <Form.Item name="description" label="Mô tả thông tin">
            <Input.TextArea rows={5} placeholder="Nhập thông tin mô tả" />
          </Form.Item>
          <Form.Item name="avatar" label="Link ảnh đại diện">
            <Input
              onChange={avatarChange}
              placeholder="Nhập link ảnh đại diện"
            />
          </Form.Item>
          <Form.Item
            dependencies={['avatar']}
            name="images"
            label="Ảnh đại diện"
          >
            <Avatar src={imageSrcAvatar} size={128} />
          </Form.Item>
          <Form.Item name="background" label="Link ảnh nền">
            <Input onChange={avatarChange} placeholder="Nhập link ảnh nền" />
          </Form.Item>
          <Form.Item
            dependencies={['background']}
            name="imagesBackground"
            label="Ảnh nền"
          >
            {imageSrcBKG ? (
              <Image
                width={270}
                height={150}
                src={imageSrcBKG}
              /> 
            ): (
              <Image
                width={250}
                src='error'
                fallback="data:image/png;base64,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"
              />
            )}
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {idGroup ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </Form.Item>
        </Form>
      )}
    </Drawer>
  )
}

export default React.memo(GroupForm)
