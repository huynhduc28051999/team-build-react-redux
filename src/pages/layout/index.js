import React, { useEffect, useCallback, useContext } from 'react'
import './layout.css'
import { useSelector, useDispatch } from 'react-redux'
import { meContruction, addNotification } from '@actions/me'
import PageHeader from '@pages/pageHeader'
import { logout } from '@actions/auth'
import { Layout as LayoutAntd } from 'antd'
import { SocketContext } from '@utils/socket'
const { Content } = LayoutAntd

const Layout = (props) => {
  const {
    history,
    children
  } = props
  const currentUser = useSelector(state => state.me.currentUser)
  const permission = useSelector(state => state.me.permission)
  const dispatch = useDispatch()
  const { socket } = useContext(SocketContext)
  useEffect(() => {
    dispatch(meContruction())
  }, [])

  useEffect(() => {
    if (currentUser._id) {
      socket.emit('joinRoom', currentUser._id)
      socket.on('notification', (data) => {
        dispatch(addNotification(data))
      })
    }
  }, [JSON.stringify(currentUser)])
  
  const onLogout = useCallback(() => {
    localStorage.clear('access-token')
    dispatch(logout())
    history.replace('/login')
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
