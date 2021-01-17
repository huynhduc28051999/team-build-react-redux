import React, { useRef, useCallback, useEffect, useReducer } from 'react'
import './index.scss'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import * as moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import stateReducer from '@components/commonFun/stateReducer'
import { batchActions } from 'redux-batched-actions'
import { getAllGroup } from '@actions/group'
import { getAllEvent } from '@actions/event'
import CustomToolbar from './action/toolBar'
import ModalEvent from './modal/modalEvent'
import CustomItemEvent from './customItemEvent'

const localizer = momentLocalizer(moment)

moment.defineLocale('vi', {
  months: 'Tháng Một_Tháng Hai_Tháng Ba_Tháng Tư_Tháng Năm_Tháng Sáu_Tháng Bảy_Tháng Tám_Tháng Chín_Tháng Mười_Tháng Mười Một_Tháng Mười Hai'.split(
    '_'
  ),
  monthsShort: 'Tháng 1_Tháng 2_Tháng 3_Tháng 4_Tháng 5_Tháng 6_Tháng 7_Tháng 8_Tháng 9_Tháng 10_Tháng 11_Tháng 12'.split(
    '_'
  ),
  weekdays: 'Chủ nhật_Thứ hai_Thứ ba_Thứ tư_Thứ năm_Thứ sáu_Thứ bảy'.split('_'),
  weekdaysShort: 'CN_Thứ 2_Thứ 3_Thứ 4_Thứ 5_Thứ 6_Thứ 7'.split('_'),
  weekdaysMin: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
  week: {
    dow: 1,
    doy: 4
  }
})

const DragAndDropCalendar = withDragAndDrop(Calendar)

function Events() {
  const [state, setState] = useReducer(stateReducer, {
    resources: undefined
  })
  const dispatch = useDispatch()
  const groups = useSelector(state => state.group.groups)
  const events = useSelector(state => state.event.events)
  const startDate = useRef(moment().startOf('day').valueOf())
  const endDate = useRef(moment().endOf('day').valueOf())
  const calendarRef = useRef()
  const selectedViewDateRef = useRef('day')
  const modalEventRef = useRef()
  const arrEventRef = useRef([])
  const {
    resources
  } = state
  const setSelectedDateView = useCallback(val => {
    selectedViewDateRef.current = val
  }, [])
  const handleChangeTypeView = useCallback((isNotSetState) => {
    const newData = events || []
    newData.forEach(i => {
      i.resourceId = i.idGroup
    })
    arrEventRef.current = newData
    let resources
    if (selectedViewDateRef.current === 'day') {
      if (groups?.length) {
        resources = groups.map(group => ({ id: group._id, title: group.name }))
      }
    }
    if (!isNotSetState) {
      setState({
        resources
      })
    }
    return { resources }
  }, [events, groups])
  const setStartDateAndEndDate = useCallback((varStartDate, varEndDate) => {
    startDate.current = varStartDate
    endDate.current = varEndDate
  }, [])
  const handleClickAdd = useCallback(() => {
    modalEventRef.current?.openModal()
  }, [])
  const toolbarFunc = useCallback(toolbarProps => {
    // const permission = permissionRef.current
    return (
      <CustomToolbar
        {...toolbarProps}
        setStartDateAndEndDate={setStartDateAndEndDate}
        handleClickAdd={handleClickAdd}
        setSelectedDateView={setSelectedDateView}
      />
    )
  }, [])
  const renderEvent = useCallback(
    evtProps => props => {
      return <CustomItemEvent
        {...props}
        evtProps={evtProps}
        selectedViewDateRef={selectedViewDateRef}
      />
    },
    []
  )

  useEffect(() => {
    dispatch(batchActions([getAllGroup(), getAllEvent()]))
  }, [])
  useEffect(() => {
    const objSetState = handleChangeTypeView(true)
    setState(objSetState)
  }, [events])
  return (
    <div className='event-management'>
      <DragAndDropCalendar
        popup
        ref={calendarRef}
        selectable
        culture='vi'
        min={new Date(1570667400000)} // tgian bat dau
        max={new Date(1570710600000)}
        scrollToTime={new Date(1570690600000)}
        step={5} // buoc nhay khi keo chon minute
        timeslots={2} // setting how many slot event in 1 hour
        localizer={localizer} // setting cho moment
        views={['day', 'week', 'month', 'agenda']}
        defaultView='day' // setting default view
        resources={resources}
        startAccessor={event => {
          return moment(event.date).toDate()
        }} // thay vi co truong start va end trong data thi ham nay se huong ve truong minh chi dinh de hien thi
        endAccessor={event => {
          return moment(event.endTime).toDate()
        }} // thay vi co truong start va end trong data thi ham nay se huong ve truong minh chi dinh de hien thi
        formats={{
          // format các khung của calendar
          dayFormat: (date, culture, localizer) => localizer.format(date, 'dddd - DD/MM', culture), // format cho header ngang cua calendar
          timeGutterFormat: 'HH:mm', // fomat time line doc
          dayHeaderFormat: (date, culture, localizer) => localizer.format(date, 'dddd DD/MM/YYYY ', culture), // format cho khi chon xem 1 ngay
          dayRangeHeaderFormat: ({ start, end }, culture, localizer) => `${localizer.format(
            start,
            'dddd DD/MM/YYYY',
            culture
          )} - ${localizer.format(end, 'dddd DD/MM/YYYY', culture)}`, // format khi chon xem 1 tuan
          eventTimeRangeFormat: () => null
        }}
        components={{
          toolbar: toolbarFunc,
          event: evtProps => renderEvent(evtProps)({
            // onSelectEvent,
            // // printEvent,
            // idSourceStore: props.sourceStore?._id,
            // loadGrid,
            // gridApi,
            // history: props.history
          }), // customer cho title cua even chi hien thị khi đủ không gian
          // eventWrapper: evtWrapperProps => eventWrapperFunc(evtWrapperProps)({
          //   // printEvent
          //   onSelectEvent,
          //   handleClickAdd,
          //   handleDeleteAppointment,
          //   handleChangeStateAppointment,
          //   handleTreatmentClick
          // }), // customer cho even
          // eslint-disable-next-line
          timeGutterHeader: () => (
            // component header cột giờ
            <span
              className='rbc-header'
              style={{ borderBottom: 'none' }}
            >
              Giờ
            </span>
          )
        }} // customer cac component trong calendar
        events={arrEventRef.current}
        onEventDrop={() => console.log('drop')}
      />
      <ModalEvent
        ref={modalEventRef}
      />
    </div>
  )
}

export default Events
