import {
  PoweroffOutlined,
  SettingOutlined,
  UserOutlined,
  BellOutlined
} from '@ant-design/icons'
import { Avatar, Col, Menu, Row, Popover, List, Badge, Button } from 'antd'
import React, { useCallback, useRef, useMemo, useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import ChangePassword from './changePassword'
import logo from '@assets/images/logo.png'
import './pageHeader.scss'
import { notificationsContruction } from '@actions/me'
import { useDispatch, useSelector } from 'react-redux'
import axiosClient from '@utils/axiosClient'
import { URL_API_NOTIFICATION_MAKE_READ_ALL, URL_API_NOTIFICATION_MAKE_READ } from '@constants/apiUrl'
import { OpenNotification } from '@components/Notification'

function PageHeader(props) {
  const { history, currentUser, onLogout } = props
  const modalRef = useRef()
  const goHome = useCallback(() => history.push('/home'), [history])
  const goBack = useCallback(() => history.goBack(), [history])
  const [visible, setVisible] = useState(false)
  const [visibleNotify, setVisibleNotify] = useState(false)
  const dispatch = useDispatch()
  const notifications = useSelector(state => state.me.notifications)

  useEffect(() => {
    dispatch(notificationsContruction())
  }, [])
  const handleReadAll = async() => {
    try {
      const { data } = await axiosClient.delete(URL_API_NOTIFICATION_MAKE_READ_ALL)
      if (data) {
        OpenNotification({
          type: 'success',
          title: 'Thành công',
        })
        dispatch(notificationsContruction())
      }
    } catch (error) {
      OpenNotification({
        type: 'error',
        description: error,
        title: 'Lỗi',
      })
    }
  }

  const handleRead = async(id) => {
    try {
      const { data } = await axiosClient.delete(URL_API_NOTIFICATION_MAKE_READ, { data: { id } })
      if (data) {
        OpenNotification({
          type: 'success',
          title: 'Thành công',
        })
        dispatch(notificationsContruction())
      }
    } catch (error) {
      OpenNotification({
        type: 'error',
        description: error,
        title: 'Lỗi',
      })
    }
  }
  const menu = useMemo(
    () => (
      <Menu>
        <Menu.Item icon={<UserOutlined />}>
          <Link to='/profile'>Thông tin cá nhân</Link>
        </Menu.Item>
        <Menu.Item icon={<SettingOutlined />}>
          <a onClick={() => {
            setVisible(false)
            modalRef.current?.openModal()
          }}>Thay đổi mật khẩu</a>
        </Menu.Item>
        <Menu.Item icon={<PoweroffOutlined />}>
          <a onClick={() => onLogout()}>Đăng xuất</a>
        </Menu.Item>
      </Menu>
    ),
    [currentUser]
  )
  
  const notificationsCom = useMemo(
    () => (
      <List
        size="small"
        bordered
        dataSource={notifications}
        renderItem={item => (
          <List.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <i>{item.content}</i>
              <Button type='link' onClick={() => handleRead(item._id)}>Đã đọc</Button>
            </div>
          </List.Item>
        )}
      />
    ),
    [notifications]
  )
  const handleVisibleChange = (visible) => {
    setVisible(visible)
  }
  return (
    <>
      <Row id="header" justify="space-between">
        <Col className="header-begin">
          <a className="header-itm" onClick={goBack}>
            <svg
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              stroke="currentColor"
            >
              <g role="presentation">
                <path d="M375.5 426q9 9 9 22.5t-9 22.5q-10 10-23 10t-23-10l-192-192q-9-9-9-22.5t9-22.5l191-193q10-10 23-10t22 10q10 9 10 22t-10 23l-157 159q-5 5-5 11.5t5 11.5z"></path>
              </g>
            </svg>
          </a>
          <a className="header-ico" onClick={goHome}>
            <img src={logo} />
          </a>
        </Col>
        <Col className="header-search"></Col>
        <Col>
          <div className="header-end">
            <Popover
              content={notificationsCom}
              title={(
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <a style={{ textTransform: 'uppercase' }}>Thông báo</a>
                  <Button disabled={!notifications.length} type='link' onClick={handleReadAll}>Tất cả đã đọc</Button>
                </div>
              )}
              trigger="click"
              placement="bottomRight"
              visible={visibleNotify}
              onVisibleChange={setVisibleNotify}
            >
              <Badge count={notifications.length}>
                <Avatar size={20} style={{ cursor: 'pointer' }} icon={<BellOutlined />} />
              </Badge>
            </Popover >
            <Popover
              content={menu}
              title={(<a style={{ textTransform: 'uppercase' }}>{currentUser?.name}</a>)}
              trigger="click"
              placement="bottomRight"
              visible={visible}
              onVisibleChange={handleVisibleChange}
            >
              <Avatar style={{ cursor: 'pointer', marginLeft: 20 }} icon={<UserOutlined />} />
            </Popover >
          </div>
        </Col>
      </Row>
      <ChangePassword modalRef={modalRef} />
    </>
  )
}

export default withRouter(PageHeader)
