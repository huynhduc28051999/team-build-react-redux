import React, { useEffect, useRef, useCallback, useReducer } from 'react'
import * as moment from 'moment'
import { AgGridReact } from 'ag-grid-react'
import AvatarDetail from '@components/avatarDetail'

const objState = {
  PROCESSING: 'Đang diễn ra',
  COMPLETED: 'Đã hoàn thành',
  CANCELLED: 'Đã Hủy'
}

function GridReport({ data = [] }) {
  const gridApi = useRef()

  const handleResize = useCallback((e) => {
    if (e) e.preventDefault()
    if (gridApi.current) gridApi.current.sizeColumnsToFit()
  }, [])
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
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
        headerName: 'Tên sự kiện',
        field: 'name'
      },
      {
        headerName: 'Đã khóa ?',
        field: 'isLocked',
        valueFormatter: ({ value }) => value ? 'Đã khóa' : ''
      },
      {
        headerName: 'Trạng thái',
        field: 'state',
        valueFormatter: ({ value }) => objState[value]
      },
      {
        headerName: 'Ngày diễn ra',
        field: 'date',
        valueFormatter: ({ value }) => moment(value).format('HH:mm DD/MM/YYYY'),
      },
      {
        headerName: 'Tổng thời gian',
        field: 'duration',
        valueFormatter: ({ value }) => `${value || 0} Phút`,
      },
    ],
    rowData: data,
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
    }
  }
  return (
    <div className='ag-grid-custom site-drawer-render-in-current-wrapper'>
      <div
        className='ag-theme-alpine'
        style={{
          height: 'calc(100vh - 8rem)'
        }}>
          <AgGridReact
            floatingFilter
            {...gridOptions}
          />
      </div>
    </div>
  )
}

export default GridReport
