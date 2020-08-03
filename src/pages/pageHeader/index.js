import React, { useRef } from 'react'
import { Menu, Layout, Dropdown } from 'antd'
import { withRouter } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './pageHeader.scss'
import ChangePassword from './changePassword'

const { Header } = Layout

function PageHeader(props) {
  const modalRef = useRef()
  const { onLogout } = props
  const MenuUser = () => {
    return (
      <Menu>
        <Menu.Item key='1' icon={<UserOutlined />} onClick={() => modalRef.current?.openModal()}>Change password</Menu.Item>
        <Menu.Item key='2' icon={<LockOutlined />} onClick={() => onLogout()}>logout</Menu.Item>
      </Menu>
    )
  }
  return (
    <>
      <Header>
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
          <Menu.Item key='1'>nav 1</Menu.Item>
          <Menu.Item key='2'>
            <Dropdown.Button overlay={MenuUser} icon={<UserOutlined />} />
          </Menu.Item>
        </Menu>
      </Header>
      <ChangePassword modalRef={modalRef}/>
    </>
  )
}

export default withRouter(PageHeader)
