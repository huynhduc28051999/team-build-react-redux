import React, { useReducer, useEffect } from 'react'
import { PageHeader, Tabs, Statistic, Select, DatePicker } from 'antd'
import { Line } from 'react-chartjs-2'
import stateReducer from '@components/commonFun/stateReducer'
import * as moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { reportUser } from '@actions/report'
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
function ReportUser() {
  const [state, setState] = useReducer(stateReducer, {
    startDate: moment().startOf('month').valueOf(),
    endDate: moment().endOf('month').valueOf(),
    type: 'DAY'
  })
  const dataReport = useSelector(state => state.report.reportUser)
  const dispatch = useDispatch()
  
  const { startDate, endDate, type } = state
  const dataLine = JSON.parse(dataReport?.dataLine || '[]')
  const data = {
    labels: dataLine.map(item => item.name),
    datasets: [
      {
        label: 'Số lượng',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        data: dataLine.map(item => item.value)
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
      reportUser({
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
        title="Thống kê số lượng nhân viên mới"
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
                      text:'Biểu đồ số lượng nhân viên mới',
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
              title="Số lượng"
              value={dataLine.reduce((total, item) => total + item.value, 0)}
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

export default ReportUser
