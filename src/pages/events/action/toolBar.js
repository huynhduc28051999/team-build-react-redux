import React, { useCallback } from 'react'
import { Radio, Button, DatePicker, Tooltip } from 'antd'
import * as moment from 'moment'
import './toolbar.scss'
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons'

const ToolBar = props => {
  const {
    view,
    label,
    date,
    onView,
    setSelectedDateView,
    setStartDateAndEndDate,
    onNavigate,
    handleClickAdd,
    loadDataEvent
  } = props
  const onChangeView = useCallback(async e => {
    onView(e.target.value)
    setSelectedDateView(e.target.value)
    if (e.target.value === 'day') {
      setStartDateAndEndDate(
        moment(date).startOf('day').valueOf(),
        moment(date).endOf('day').valueOf()
      )
    } else if (e.target.value === 'week') {
      setStartDateAndEndDate(
        moment(date).startOf('isoWeek').valueOf(),
        moment(date).endOf('isoWeek').valueOf()
      )
    } else {
      setStartDateAndEndDate(
        moment(date).startOf('month').valueOf(),
        moment(date).endOf('month').valueOf()
      )
    }
    loadDataEvent()
  }, [])

  const onClickToday = useCallback(async () => {
    onNavigate('day', moment().toDate())
    if (view === 'day') {
      setStartDateAndEndDate(
        moment().startOf('day').valueOf(),
        moment().endOf('day').valueOf()
      )
    } else if (view === 'week') {
      setStartDateAndEndDate(
        moment().startOf('isoWeek').valueOf(),
        moment().endOf('isoWeek').valueOf()
      )
    } else {
      setStartDateAndEndDate(
        moment().startOf('month').valueOf(),
        moment().endOf('month').valueOf()
      )
    }
    loadDataEvent()
  }, [view, date])

  const onClickOneDay = useCallback(
    type => async () => {
      if (type === 'add') {
        if (view === 'day') {
          onNavigate('DAY', moment(date).add(1, 'days').toDate())
          setStartDateAndEndDate(
            moment(date).add(1, 'days').startOf('day').valueOf(),
            moment(date).add(1, 'days').endOf('day').valueOf()
          )
        } else if (view === 'week') {
          onNavigate('DAY', moment(date).add(7, 'days').toDate())
          setStartDateAndEndDate(
            moment(date).add(7, 'days').startOf('isoWeek').valueOf(),
            moment(date).add(7, 'days').endOf('isoWeek').valueOf()
          )
        } else {
          onNavigate('DAY', moment(date).add(1, 'months').toDate())
          setStartDateAndEndDate(
            moment(date).add(1, 'months').startOf('months').valueOf(),
            moment(date).add(1, 'months').endOf('months').valueOf()
          )
        }
      } else if (view === 'day') {
        onNavigate('DAY', moment(date).subtract(1, 'days').toDate())
        setStartDateAndEndDate(
          moment(date).subtract(1, 'days').startOf('day').valueOf(),
          moment(date).subtract(1, 'days').endOf('day').valueOf()
        )
      } else if (view === 'week') {
        onNavigate('DAY', moment(date).subtract(7, 'days').toDate())
        setStartDateAndEndDate(
          moment(date).subtract(7, 'days').startOf('isoWeek').valueOf(),
          moment(date).subtract(7, 'days').endOf('isoWeek').valueOf()
        )
      } else {
        onNavigate('DAY', moment(date).subtract(1, 'months').toDate())
        setStartDateAndEndDate(
          moment(date).subtract(1, 'months').startOf('months').valueOf(),
          moment(date).subtract(1, 'months').endOf('months').valueOf()
        )
      }
      loadDataEvent()
    },
    [date, view]
  )

  const onChangeCalendar = useCallback(
    async varMoment => {
      if (view === 'day') {
        onNavigate('DAY', moment(varMoment.valueOf()).toDate())
        setStartDateAndEndDate(
          moment(varMoment).startOf('day').valueOf(),
          moment(varMoment).endOf('day').valueOf()
        )
      } else if (view === 'week') {
        onNavigate(
          'DAY',
          moment(varMoment.valueOf()).startOf('isoWeek').toDate()
        )
        setStartDateAndEndDate(
          moment(varMoment).startOf('isoWeek').valueOf(),
          moment(varMoment).endOf('isoWeek').valueOf()
        )
      } else {
        onNavigate(
          'DAY',
          moment(varMoment.valueOf()).startOf('months').toDate()
        )
        setStartDateAndEndDate(
          moment(varMoment).startOf('months').valueOf(),
          moment(varMoment).endOf('months').valueOf()
        )
      }
      loadDataEvent()
    },
    [view]
  )

  const viewAgenda = useCallback(() => {
    onView('agenda')
  }, [])

  const renderButtonToday = useCallback(view => {
    if (view === 'day') {
      return 'Hôm nay'
    }
    if (view === 'week') {
      return 'Tuần này'
    }
    return 'Tháng này'
  }, [])
  const renderFastAddButton = useCallback(view => {
    if (view === 'day') {
      return 'Tiến 1 ngày'
    }
    if (view === 'week') {
      return 'Tiến 1 tuần'
    }
    return 'Tiến 1 tháng'
  }, [])
  const renderFastPreviosButton = useCallback(view => {
    if (view === 'day') {
      return 'Lùi 1 ngày'
    }
    if (view === 'week') {
      return 'Lùi 1 tuần'
    }
    return 'Lùi 1 tháng'
  }, [])
  const renderDatePicker = useCallback(view => {
    if (view === 'day') {
      return (
        <DatePicker
          onChange={onChangeCalendar}
          allowClear={false}
          className='calendarToolBarAppointment'
          style={{ maxWidth: 30 }}
          value={moment(date)}
        />
      )
    }
    if (view === 'week') {
      return (
        <DatePicker
          picker="week"
          allowClear={false}
          onChange={onChangeCalendar}
          className='calendarToolBarAppointment'
          style={{ maxWidth: 30 }}
          value={moment(date)}
        />
      )
    }
    return (
      <DatePicker
        picker="month"
        allowClear={false}
        onChange={onChangeCalendar}
        className='calendarToolBarAppointment'
        style={{ maxWidth: 30 }}
        value={moment(date)}
      />
    )
  }, [])

  return (
    <div style={{ marginBottom: 15, display: 'flex', alignItems: 'center' }}>
      <Radio.Group value={view} onChange={onChangeView} size="small">
        <Tooltip title='Xem theo ngày'>
          <Radio.Button value='day'>Ngày</Radio.Button>
        </Tooltip>
        <Tooltip title='Xem theo tuần'>
          <Radio.Button value='week'>Tuần</Radio.Button>
        </Tooltip>
        <Tooltip title='Xem theo tháng'>
          <Radio.Button value='month'>Tháng</Radio.Button>
        </Tooltip>
      </Radio.Group>
      <Tooltip title='Chọn nhanh'>
        <Button size="small" type="text" onClick={onClickToday}>
          {renderButtonToday(view)}
        </Button>
      </Tooltip>

      <Tooltip title={renderFastPreviosButton(view)}>
      <DoubleLeftOutlined
        onClick={onClickOneDay('subtract')}
        style={{ marginLeft: 5, marginRight: 5}}
      />
      </Tooltip>
      {label}
      {renderDatePicker(view)}
      <Tooltip title={renderFastAddButton(view)}>
      <DoubleRightOutlined
        onClick={onClickOneDay('add')}
        style={{ marginLeft: 5, marginRight: 5}}
      />
      </Tooltip>
      <div style={{ marginLeft: 'auto' }}>
        <Tooltip title='Xem dưới dạng danh sách'>
          <Button size="small" type="text" onClick={viewAgenda}>
            Xem dạng danh sách
          </Button>
        </Tooltip>
        <Tooltip title='Thêm lịch hẹn mới'>
          <Button size="small" type="text" onClick={handleClickAdd}>
            Tạo mới lịch hẹn
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}

export default React.memo(ToolBar)
