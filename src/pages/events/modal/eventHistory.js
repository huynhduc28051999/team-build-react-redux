import React, { useEffect } from 'react'
import * as moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { getEventHistory } from '@actions/event'
import { Table } from 'antd'

const columns = [
  {
    title: 'Thời gian',
    dataIndex: 'time',
    render: time => (
      <span>{moment(time).format('HH:mm DD/MM/YYYY')}</span>
    ),
  },
  {
    title: 'Nội dung',
    dataIndex: 'content'
  }
]
const EventHistory = ({ idEvent }) => {
  const dispatch = useDispatch()
  const eventHistory = useSelector(state => state.event.eventHistory)
  useEffect(() => {
    if (idEvent) {
      dispatch(
        getEventHistory({ idEvent })
      )
    }
  }, [idEvent])
  return (
    <Table
      columns={columns}
      dataSource={eventHistory || []}
  />
  )
}

export default EventHistory
