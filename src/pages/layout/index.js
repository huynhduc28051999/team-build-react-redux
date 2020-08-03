import React, { useEffect, useCallback } from 'react'
import { Layout as LayoutAnt, Menu } from 'antd'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import './layout.css'
import { useSelector, useDispatch } from 'react-redux'
import { meContruction } from '@actions/me'
import PageHeader from '@pages/pageHeader'
import { logout } from '@actions/auth'
const { Content, Footer, Sider } = LayoutAnt

const Layout = (props) => {
  const {
    history,
    children
  } = props
  const currentUser = useSelector(state => state.me.currentUser)
  const permission = useSelector(state => state.me.permission)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(meContruction())
    // eslint-disable-next-line
  }, [])
  
  const onLogout = useCallback(() => {
    localStorage.clear('access-token')
    dispatch(logout())
    history.replace('/login')
    // eslint-disable-next-line
  }, [])
  return (
    <LayoutAnt>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            nav 4
          </Menu.Item>
        </Menu>
      </Sider>
      <LayoutAnt>
        <PageHeader history={history} childrenProps={children} onLogout={onLogout}/>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{ padding: 12, minHeight: 'calc(100vh - 135px)', backgroundColor: '#fff' }}>
            {React.cloneElement(children, {
              me: currentUser,
              permission: permission
            })}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </LayoutAnt>
    </LayoutAnt>
  );
}

export default React.memo(Layout)
