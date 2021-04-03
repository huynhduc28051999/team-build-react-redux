import React, { useCallback } from 'react'
import { menuRouteManager, menuRouteAdmin, menuRouteUser } from '@configs'
import { Link } from 'react-router-dom'
import './dashboard.scss'
import ChartUser from './chartUser'
import ChartEvent from './chartEvent'

const Dashboard = ({ history, permission, me }) => {
  const handleClick = useCallback((path) => {
    history.push(path)
  }, [])
  const router = permission.code === 'ADMIN' ? menuRouteAdmin : permission.code === 'MANAGER' ? menuRouteManager : menuRouteUser
  return (
    <div style={{ height: 'calc(100vh - 5.75rem)' }}>
      <div className='sections-wapper'>
        {permission.code === 'ADMIN' && <ChartUser />}
        {permission.code === 'MANAGER' && <ChartEvent />}
        {router.map((item, idx) => {
          return (
          <div key={idx} className='section-wapper'>
            <div className='top'>
              <div className='title'>{item.title}</div>
            </div>
            <div className='section'>{item.childs.map(itemChild => (
              <>
                {itemChild.path === '/detailGroup' ? (
                  <div
                    className='draggable-wapper'
                    key={itemChild.path}
                    onClick={() => handleClick(`${itemChild.path}/${me.idGroup}`)}
                  >
                    <div className='inner'>
                      <Link className='in-name' to={`${itemChild.path}/${me.idGroup}`}>{itemChild.name}</Link>
                    </div>
                  </div>
                ) : (
                  <div
                    className='draggable-wapper'
                    key={itemChild.path}
                    onClick={() => handleClick(itemChild.path)}
                  >
                    <div className='inner'>
                      <Link className='in-name' to={itemChild.path}>{itemChild.name}</Link>
                    </div>
                  </div>
                )}
              </>
            ))}</div>
          </div> 
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
