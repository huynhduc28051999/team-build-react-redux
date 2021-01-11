import React, { useCallback, useState } from 'react'
import { Radio, Button, Calendar, Tooltip } from 'antd'
import * as moment from 'moment'
// import SelectDoctor from './selectDoctor'
// import SelectImplementRoom from './selectImplementRoom'
import './toolbar.scss'

export default React.memo(props => {
  const { view, label, date } = props
  const [typeView, setTypeView] = useState('doctor')
  const onChangeView = useCallback(async e => {
    props.onView(e.target.value)
    props.setSelectedDateView(e.target.value)
    if (e.target.value === 'day') {
      props.setStartDateAndEndDate(
        moment(date).startOf('day').valueOf(),
        moment(date).endOf('day').valueOf()
      )
      await props.loadGrid()
    } else if (e.target.value === 'week') {
      props.setStartDateAndEndDate(
        moment(date).startOf('isoWeek').valueOf(),
        moment(date).endOf('isoWeek').valueOf()
      )
      await props.loadGrid()
    } else {
      props.setStartDateAndEndDate(
        moment(date).startOf('month').valueOf(),
        moment(date).endOf('month').valueOf()
      )
      await props.loadGrid()
    }
  }, [])

  const onClickToday = useCallback(async () => {
    props.onNavigate('day', moment().toDate())
    if (props.view === 'day') {
      props.setStartDateAndEndDate(
        moment().startOf('day').valueOf(),
        moment().endOf('day').valueOf()
      )
      await props.loadGrid()
    } else if (props.view === 'week') {
      props.setStartDateAndEndDate(
        moment().startOf('isoWeek').valueOf(),
        moment().endOf('isoWeek').valueOf()
      )
      await props.loadGrid()
    } else {
      props.setStartDateAndEndDate(
        moment().startOf('month').valueOf(),
        moment().endOf('month').valueOf()
      )
      await props.loadGrid()
    }
  }, [props.view, props.date])

  const onClickOneDay = useCallback(
    type => async () => {
      if (type === 'add') {
        if (props.view === 'day') {
          props.onNavigate('DAY', moment(date).add(1, 'days').toDate())
          props.setStartDateAndEndDate(
            moment(date).add(1, 'days').startOf('day').valueOf(),
            moment(date).add(1, 'days').endOf('day').valueOf()
          )
          await props.loadGrid()
        } else if (props.view === 'week') {
          props.onNavigate('DAY', moment(date).add(7, 'days').toDate())
          props.setStartDateAndEndDate(
            moment(date).add(7, 'days').startOf('isoWeek').valueOf(),
            moment(date).add(7, 'days').endOf('isoWeek').valueOf()
          )
          await props.loadGrid()
        } else {
          props.onNavigate('DAY', moment(date).add(1, 'months').toDate())
          props.setStartDateAndEndDate(
            moment(date).add(1, 'months').startOf('months').valueOf(),
            moment(date).add(1, 'months').endOf('months').valueOf()
          )
          await props.loadGrid()
        }
      } else if (props.view === 'day') {
        props.onNavigate('DAY', moment(date).subtract(1, 'days').toDate())
        props.setStartDateAndEndDate(
          moment(date).subtract(1, 'days').startOf('day').valueOf(),
          moment(date).subtract(1, 'days').endOf('day').valueOf()
        )
        await props.loadGrid()
      } else if (props.view === 'week') {
        props.onNavigate('DAY', moment(date).subtract(7, 'days').toDate())
        props.setStartDateAndEndDate(
          moment(date).subtract(7, 'days').startOf('isoWeek').valueOf(),
          moment(date).subtract(7, 'days').endOf('isoWeek').valueOf()
        )
        await props.loadGrid()
      } else {
        props.onNavigate('DAY', moment(date).subtract(1, 'months').toDate())
        props.setStartDateAndEndDate(
          moment(date).subtract(1, 'months').startOf('months').valueOf(),
          moment(date).subtract(1, 'months').endOf('months').valueOf()
        )
        await props.loadGrid()
      }
    },
    [props.date, props.view]
  )

  const onChangeCalendar = useCallback(
    async varMoment => {
      if (props.view === 'day') {
        props.onNavigate('DAY', moment(varMoment.valueOf()).toDate())
        props.setStartDateAndEndDate(
          moment(varMoment).startOf('day').valueOf(),
          moment(varMoment).endOf('day').valueOf()
        )
        await props.loadGrid()
      } else if (props.view === 'week') {
        props.onNavigate(
          'DAY',
          moment(varMoment.valueOf()).startOf('isoWeek').toDate()
        )
        props.setStartDateAndEndDate(
          moment(varMoment).startOf('isoWeek').valueOf(),
          moment(varMoment).endOf('isoWeek').valueOf()
        )
        await props.loadGrid()
      } else {
        props.onNavigate(
          'DAY',
          moment(varMoment.valueOf()).startOf('months').toDate()
        )
        props.setStartDateAndEndDate(
          moment(varMoment).startOf('months').valueOf(),
          moment(varMoment).endOf('months').valueOf()
        )
        await props.loadGrid()
      }
    },
    [props.view]
  )

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
        <Calendar.DatePicker
          onChange={onChangeCalendar}
          className='calendarToolBarAppointment'
          style={{ maxWidth: 30 }}
          value={moment(date)}
        />
      )
    }
    if (view === 'week') {
      return (
        <Calendar.WeekPicker
          onChange={onChangeCalendar}
          className='calendarToolBarAppointment'
          style={{ maxWidth: 30 }}
          value={moment(date)}
        />
      )
    }
    return (
      <Calendar.MonthPicker
        onChange={onChangeCalendar}
        className='calendarToolBarAppointment'
        style={{ maxWidth: 30 }}
        value={moment(date)}
      />
    )
  }, [])

  const handleChangeTypeView = useCallback(e => {
    setTypeView(e.target.value)
    props.handleChangeTypeView(e.target.value)
  }, [])

  return (
    <div style={{ marginBottom: 15, display: 'flex', alignItems: 'center' }}>
      <Radio.Group value={view} onChange={onChangeView}>
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
        <Button noFill onClick={onClickToday}>
          {renderButtonToday(view)}
        </Button>
      </Tooltip>

      <Tooltip title={renderFastPreviosButton(view)}>
        <Button
          iconName='close-command-field'
          noFill
          onClick={onClickOneDay('subtract')}
        />
      </Tooltip>
      {label}
      {renderDatePicker(view)}
      <Tooltip title={renderFastAddButton(view)}>
        <Button
          iconName='open-command-field'
          noFill
          onClick={onClickOneDay('add')}
        />
      </Tooltip>
      {
        props.isEdit && (
          <Radio.Group
            value={typeView}
            onChange={handleChangeTypeView}
            style={{ marginRight: 2 }}
          >
            <Tooltip title='Bác sĩ'>
              <Radio.Button value='doctor'>Bác sĩ</Radio.Button>
            </Tooltip>
            <Tooltip title='Phòng'>
              <Radio.Button value='implementRoom'>Ghế nha</Radio.Button>
            </Tooltip>
          </Radio.Group>
        )
      }
      {/* {typeView === 'doctor' ? (
        <>
          <span>Bác sĩ:</span>
          <SelectDoctor
            onChangeDoctor={props.onChangeDoctor}
            selectedDoctor={props.selectedDoctor}
          />
        </>
      ) : (
        <>
          <span>Phòng:</span>
          <SelectImplementRoom setImplementRoom={props.setImplementRoom} />
        </>
      )} */}
      {props.isCreate && (
        <div style={{ marginLeft: 'auto' }}>
          <Tooltip title='Thêm lịch hẹn mới'>
            <Button noFill onClick={props.handleClickAdd}>
              Tạo mới lịch hẹn
            </Button>
          </Tooltip>
        </div>
      )}
    </div>
  )
})
