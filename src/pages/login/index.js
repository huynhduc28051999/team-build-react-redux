import React from 'react'
import LoginForm from './loginForm'
import './index.scss'
import { Row, Col } from 'antd'

export default function Login() {
  return (
    <Row className="wrapper">
      <Col span={12}>
        <div className="image-login"></div>
      </Col>
      <Col span={12}>
        <div className="wrapper-login-form">
          <div className="logo" />
          <h1>đăng nhập</h1>
          <LoginForm history={history} />
        </div>
      </Col>
    </Row>
  )
}
