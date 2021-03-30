import React, { useEffect, useContext } from 'react'
import { Tabs } from 'antd'
import EventInformation from './eventInformation'
import './index.scss'
import ItemUser from './itemUser';
import Comment from './comment.js';
import { useSelector, useDispatch } from 'react-redux';
import { getEventById } from '@actions/event';
import { SocketContext } from '@utils/socket';

const { TabPane } = Tabs;

export default function DetailEvent(props) {
  const { match: { params: { _id }} } = props
  const eventById = useSelector(state => state.event.eventById)
  const dispatch = useDispatch()
  const socket = useContext(SocketContext)

  useEffect(() => {
    if (_id) {
      dispatch(
        getEventById({ _id })
      )
    }
    return () => {
      socket.emit('leaveRoom', _id)
      // socket.disconnect()
    }
  }, [_id])
  

  return (
    <div className='detail-event'>
      <div className='header-title'>Sự kiện 1</div>
      <div className='detail-event-content'>
      <Tabs type='card' size='large'>
        <TabPane tab='Thông tin sự kiện' key='1'>
          <EventInformation event={eventById} />
        </TabPane>
        <TabPane tab='Người tham dự' key='2'>
          <div className='list-of-user'>
            {eventById?.users?.map((item, idx) => (
              <ItemUser user={item} key={idx} permission={props.permission} idEvent={_id} />
            ))}
          </div>
        </TabPane>
        <TabPane tab='Bình luận' key='3'>
          <Comment idEvent={_id} />
        </TabPane>
      </Tabs>
      </div>
    </div>
  )
}
