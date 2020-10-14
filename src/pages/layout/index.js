import React, { useEffect, useCallback } from 'react'
import './layout.css'
import { useSelector, useDispatch } from 'react-redux'
import { meContruction } from '@actions/me'
import PageHeader from '@pages/pageHeader'
import { logout } from '@actions/auth'
import { Layout as LayoutAntd } from 'antd'

const { Content } = LayoutAntd

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
    <div
      style={{
        height: '100vh',
        // backgroundImage: `url`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        overflow: 'hidden',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <PageHeader
        history={history}
        childrenProps={children}
        currentUser={currentUser}
        onLogout={onLogout}
      />
      <LayoutAntd className="layout">
        <Content>
          <div
            className="site-layout-content"
            style={{ height: 'calc(100vh - 2.75rem)' }}
          >
            {React.cloneElement(children, {
              me: currentUser,
              permission: permission,
            })}
          </div>
        </Content>
      </LayoutAntd>
    </div>
  )
}

export default React.memo(Layout)
