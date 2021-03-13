import React from 'react'
import { Tabs } from 'antd'
import EventInformation from './eventInformation'
import './index.scss'
import ItemUser from './itemUser';
import Comment from './comment.js';

const { TabPane } = Tabs;

export default function DetailEvent(props) {
  console.log(props)
  
  function callback(key) {
    console.log(key);
  }

  return (
    <div className='detail-event'>
      <div className='header-title'>Sự kiện 1</div>
      <div className='detail-event-content'>
      <Tabs onChange={callback} type="card" size='large'>
        <TabPane tab="Tab 1" key="1">
          <EventInformation />
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          <div className='list-of-user'>
            <ItemUser />
            <ItemUser />
            <ItemUser />
          </div>
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          <Comment />
        </TabPane>
      </Tabs>
      </div>
    </div>
  )
}
