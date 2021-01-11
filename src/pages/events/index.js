import React, { useRef } from 'react'
import './index.scss'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import * as moment from 'moment'

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
  const calendarRef = useRef()
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
        views={['day', 'week', 'month']}
        defaultView='day' // setting default view
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
          // eventTimeRangeFormat: ({ start, end }, culture, localizer) => ( // format lai time cua event
          //   `${localizer.format(
          //     start,
          //     'HH:mm',
          //     culture
          //   )} - ${localizer.format(end, 'HH:mm', culture)}`)
          eventTimeRangeFormat: () => null
        }}
        components={{
          // event: evtProps => renderEvent(evtProps)({
          //   onSelectEvent,
          //   // printEvent,
          //   idSourceStore: props.sourceStore?._id,
          //   loadGrid,
          //   gridApi,
          //   history: props.history
          // }), // customer cho title cua even chi hien thị khi đủ không gian
          // eventWrapper: evtWrapperProps => eventWrapperFunc(evtWrapperProps)({
          //   // printEvent
          //   onSelectEvent,
          //   handleClickAdd,
          //   handleDeleteAppointment,
          //   handleChangeStateAppointment,
          //   handleTreatmentClick
          // }), // customer cho even
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
        events={[]}
      />
    </div>
  )
}

export default Events
