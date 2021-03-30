import React, { useReducer, useEffect } from 'react'
import { Select, TimePicker } from 'antd'
import { Line } from 'react-chartjs-2'
import moment from 'moment'
import stateReducer from '@components/commonFun/stateReducer'
import { useSelector, useDispatch } from 'react-redux'
import { reportEvent } from '@actions/report'

const { Option } = Select
const { RangePicker } = TimePicker

function ChartEvent() {
  const [state, setState] = useReducer(stateReducer, {
    startDate: moment().startOf('month').valueOf(),
    endDate: moment().endOf('month').valueOf(),
    type: 'DAY'
  })
  const dataReport = useSelector(state => state.report.reportEvent)
  const dispatch = useDispatch()
  
  const { startDate, endDate, type } = state
  const dataLine = JSON.parse(dataReport?.dataLine || '[]')
  const data = {
    labels: dataLine.map(item => item.name),
    datasets: [
      {
        label: 'Đã hoàn thành',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        data: dataLine.map(item => item.COMPLETED)
      },
      {
        label: 'Đang xử lý',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        data: dataLine.map(item => item.PROCESSING)
      },
      {
        label: 'Đã hủy',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 2,
        data: dataLine.map(item => item.CANCELLED)
      }
    ]
  }
  const handleChangeDate = (date) => {
    setState({
      startDate: date[0].startOf('day').valueOf(),
      endDate: date[1].startOf('day').valueOf()
    })
  }
  useEffect(() => {
    dispatch(
      reportEvent({
        reportType: type,
        startDate,
        endDate
      })
    )
  }, [startDate, endDate, type])
  
  return (
    <div className='chart'>
      <div className='header'>
        <Select
          key='select'
          defaultValue={type}
          onChange={(type) => setState({ type })}
          style={{ width: '100px' }}
        >
          <Option value='DAY'>Ngày</Option>
          <Option value='WEEK'>Tuần</Option>
          <Option value='MONTH'>Tháng</Option>
        </Select>
        <RangePicker
          key='datepicker'
          format='DD/MM/YYYY'
          onChange={handleChangeDate}
          defaultValue={[moment(startDate), moment(endDate)]}
          disabledDate={(current) => current && current > moment().endOf('day')}
        />
      </div>
      <div className='content'>
        <Line
          height='100vh'
          data={data}
          options={{
            title:{
              display: true,
              text:'Biểu đồ số lượng sự kiện được tạo',
              fontSize: 20
            },
            legend:{
              display: true,
              position:'right'
            }
          }}
        />
      </div>
    </div>
  )
}

export default ChartEvent
