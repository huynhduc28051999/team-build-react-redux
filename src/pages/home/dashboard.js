import React, { useCallback } from 'react'
import { menuRoute } from '@configs'
import { Link } from 'react-router-dom'
import './dashboard.scss'

const Dashboard = ({ history }) => {
  const handleClick = useCallback((path) => {
    history.push(path)
  }, [])
  return (
    <div style={{ height: 'calc(100vh - 5.75rem)' }}>
      <div className='sections-wapper'>
        {menuRoute.map((item, idx) => {
          return (
          <div key={idx} className='section-wapper'>
            <div className='top'>
              <div className='title'>{item.title}</div>
            </div>
            <div className='section'>{item.childs.map(itemChild => (
              <div
                className='draggable-wapper'
                key={itemChild.path}
                onClick={() => handleClick(itemChild.path)}
              >
                <div className='inner'>
                  <Link className='in-name' to={itemChild.path}>{itemChild.name}</Link>
                </div>
              </div>
            ))}</div>
          </div> 
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
