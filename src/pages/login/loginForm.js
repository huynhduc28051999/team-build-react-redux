import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { loginContruction } from '@actions/auth';

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function LoginForm({
  history
}) {
  const [form] = Form.useForm()
  const token = useSelector(state => state.auth.token)
  const error = useSelector(state => state.auth.error)
  const isLoadingAuth = useSelector((state) => state.auth.isLoadingAuth)
  const dispatch = useDispatch()
  const onFinish = values => {
    dispatch(loginContruction(values))
    if (token) {
      history.push("/home")
    }
    if (error) {
      console.log(error)
    }
  };

  return (
    <Form
      {...layout}
      name="login-form"
      form={form}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      size="large"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input placeholder="Nhập username" />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password placeholder="Nhập password" />
      </Form.Item>

      <Form.Item {...layout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={isLoadingAuth}>
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  )
}
