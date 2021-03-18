import React, { useReducer, useEffect } from 'react'
import { PageHeader, Tabs, Statistic, Select, DatePicker } from 'antd'
import { Line } from 'react-chartjs-2'
import stateReducer from '@components/commonFun/stateReducer'
import * as moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { reportEvent } from '@actions/report'
import GridReport from './gridReport'

const { Option } = Select
const { RangePicker } = DatePicker
const { TabPane } = Tabs

const Content = ({ children, extra }) => (
  <div className="content">
    <div className="main">{children}</div>
    <div className="extra">{extra}</div>
  </div>
)
function ReportEvent() {
  const [state, setState] = useReducer(stateReducer, {
    startDate: moment().startOf('month').valueOf(),
    endDate: moment().endOf('day').valueOf(),
    type: 'DAY',
    COMPLETEDTotal: 0,
    PROCESSINGTotal: 0,
    CANCELLEDTotal: 0
  })
  const dataReport = useSelector(state => state.report.reportEvent)
  const dispatch = useDispatch()
  
  const { startDate, endDate, type } = state
  const dataLine = JSON.parse(dataReport?.dataLine || '[]')
  console.log(dataLine)
  useEffect(() => {
    const {
      COMPLETEDTotal,
      PROCESSINGTotal,
      CANCELLEDTotal
    } = dataLine.reduce((object, item) => {
      return {
        COMPLETEDTotal: object.COMPLETEDTotal + item.COMPLETED,
        PROCESSINGTotal: object.PROCESSINGTotal + item.PROCESSING,
        CANCELLEDTotal: object.CANCELLEDTotal + item.CANCELLED
      }
    }, {
      COMPLETEDTotal: 0,
      PROCESSINGTotal: 0,
      CANCELLEDTotal: 0
    })
    setState({
      COMPLETEDTotal,
      PROCESSINGTotal,
      CANCELLEDTotal
    })
  }, [JSON.stringify(dataLine)])
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
    console.log('zô1');
    dispatch(
      reportEvent({
        reportType: type,
        startDate,
        endDate
      })
    )
  }, [startDate, endDate, type])
  return (
    <div className='report-page'>
      <PageHeader
        className="site-page-header-responsive"
        title="Thống kê số lượng sự kiện được tạo"
        extra={[
          <Select
            key='select'
            defaultValue={type}
            onChange={(type) => setState({ type })}
            style={{ width: '100px' }}
          >
            <Option value='DAY'>Ngày</Option>
            <Option value='WEEK'>Tuần</Option>
            <Option value='MONTH'>Tháng</Option>
          </Select>,
         <RangePicker
          key='datepicker'
          format='DD/MM/YYYY'
          onChange={handleChangeDate}
          defaultValue={[moment(startDate), moment(endDate)]}
          disabledDate={(current) => current && current > moment().endOf('day')}
        />,
        ]}
        footer={
          <Tabs defaultActiveKey="1">
            <TabPane tab="Biểu đồ" key="1">
              <div>
                <Line
                  data={data}
                  options={{
                    title:{
                      display:true,
                      text:'Biểu đồ số lượng sự kiện được tạo',
                      fontSize:20
                    },
                    legend:{
                      display:true,
                      position:'right'
                    }
                  }}
                />
              </div>
            </TabPane>
            <TabPane tab="Danh sách" key="2">
              <div>
                <GridReport data={dataReport.dataGrid}/>
              </div>
            </TabPane>
          </Tabs>
        }
      >
        <Content extra={(
          <div
            style={{
              display: 'flex',
              width: 'max-content',
              justifyContent: 'flex-end',
            }}
          >
            <Statistic
              title="Đã hoàn thành"
              value={state.COMPLETEDTotal}
              style={{
                marginRight: 32,
              }}
            />
            <Statistic
              title="Đang xử lý"
              value={state.PROCESSINGTotal}
              style={{
                marginRight: 32,
              }}
            />
            <Statistic
              title="Đã hủy"
              value={state.CANCELLEDTotal}
              style={{
                marginRight: 32,
              }}
            />
          </div>
        )}/>
      </PageHeader>
    </div>
  )
}

export default ReportEvent
