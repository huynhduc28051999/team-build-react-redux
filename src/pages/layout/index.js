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
        minHeight: '100vh',
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
        <Content className='layout-wapper'>
          <div
            className="site-layout-content"
            style={{ minHeight: 'calc(100vh - 5.75rem)' }}
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
