import React, { useEffect, useRef, useCallback, useReducer } from 'react'
import * as moment from 'moment'
import { AgGridReact } from 'ag-grid-react'
import AvatarDetail from '@components/avatarDetail'
import { useSelector, useDispatch } from 'react-redux'
import { DatePicker, Button } from 'antd'
import { reportUserEvent } from '@actions/report'
import stateReducer from '@components/commonFun/stateReducer'
import ListEventDetail from './listEventDetail'

const { RangePicker } = DatePicker
const genderInterface = {
  MALE: 'Nam',
  FEMALE: 'Nữ',
  ORTHER: 'Khác'
}

function GridReport() {
  const gridApi = useRef()
  const drawerRef = useRef()
  const [state, setState] = useReducer(stateReducer, {
    startDate: moment().startOf('month').valueOf(),
    endDate: moment().endOf('month').valueOf(),
    idUser: null,
    showViewButton: false
  })
  const rowData = useSelector(state => state.report.reportUserEvent)
  const dispatch = useDispatch()
  const { startDate, endDate, showViewButton, idUser } = state

  const handleResize = useCallback((e) => {
    if (e) e.preventDefault()
    if (gridApi.current) gridApi.current.sizeColumnsToFit()
  }, [])
  const handleChangeDate = (date) => {
    setState({
      startDate: date[0].startOf('day').valueOf(),
      endDate: date[1].startOf('day').valueOf()
    })
  }
  const hadleOpenDrawer = () => {
    const [row] = gridApi.current?.getSelectedRows()
    drawerRef.current?.handleOpen(row?._id)
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  useEffect(() => {
    dispatch(
      reportUserEvent({
        startDate,
        endDate
      })
    )
  }, [startDate, endDate])
  const gridOptions = {
    columnDefs: [
      {
        headerName: 'Ảnh',
        field: 'avatar',
        width: 120,
        sortable: false,
        filter: false,
        cellRenderer: 'avatarRenderer'
      },
      {
        headerName: 'Tên nhân viên',
        field: 'name'
      },
      {
        headerName: 'Email',
        field: 'email'
      },
      {
        headerName: 'Số điện thoại',
        field: 'phoneNumber'
      },
      {
        headerName: 'Giới tính',
        field: 'gender',
        valueFormatter: ({ value }) => genderInterface[value?.toUpperCase() || 'ORTHER']
      },
      {
        headerName: 'Số lượng sự kiện tham gia',
        field: 'count'
      }
    ],
    rowSelection: 'single',
    rowData: rowData || [],
    defaultColDef: {
      sortable: true,
      resizable: true,
      floatingFilter: true,
      filter: true
    },
    onGridReady: (params) => {
      gridApi.current = params.api
      params.api.sizeColumnsToFit()
    },
    onFirstDataRendered: (params) => {
      params.api.sizeColumnsToFit()
    },
    frameworkComponents: {
      avatarRenderer: AvatarDetail
    },
    onRowSelected: (params) => {
      const row = params.api.getSelectedRows()
      if (row.length === 1) {
        setState({ showViewButton: true })
      } else {        
        setState({ showViewButton: false })
      }
    },
  }
  return (
    <div className='ag-grid-custom site-drawer-render-in-current-wrapper'>
      <div className='header-def' style={{ display: 'flex', justifyContent: 'space-between', height: 50 }}>
        <RangePicker
          style={{ alignSelf: 'center', marginLeft: 10 }}
          key='datepicker'
          format='DD/MM/YYYY'
          onChange={handleChangeDate}
          defaultValue={[moment(startDate), moment(endDate)]}
          disabledDate={(current) => current > moment().endOf('day')}
        />
        <Button
          disabled={!showViewButton}
          style={{ alignSelf: 'flex-end' }}
          onClick={hadleOpenDrawer}
        >
          Xem
        </Button>
      </div>
      <div
        className='ag-theme-alpine'
        style={{
          height: 'calc(100vh - 8rem)'
        }}>
          <AgGridReact
            floatingFilter
            suppressRowClickSelection={false}
            {...gridOptions}
          />
      </div>
      <ListEventDetail ref={drawerRef} startDate={startDate} endDate={endDate} />
    </div>
  )
}

export default GridReport
