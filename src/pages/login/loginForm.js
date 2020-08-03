import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { loginContruction } from '@actions/auth';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
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
      size='large'
    >
      <Form.Item
        label="Username"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
