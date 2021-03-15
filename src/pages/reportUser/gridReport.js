import React, { useEffect, useRef, useCallback, useReducer } from 'react'
import * as moment from 'moment'
import { AgGridReact } from 'ag-grid-react'
import AvatarDetail from '@components/avatarDetail'

const genderInterface = {
  MALE: 'Nam',
  FEMALE: 'Nữ',
  ORTHER: 'Khác'
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
        headerName: 'Tên nhân viên',
        field: 'name'
      },
      {
        headerName: 'Tình trạng',
        field: 'isLocked',
        valueFormatter: ({ value }) => value ? 'Đã khóa' : ''
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
        headerName: 'Ngày sinh',
        field: 'brithday',
        valueFormatter: ({ value }) => moment(value).format('L'),
        filter: false
      },
      {
        headerName: 'Phòng ban',
        field: 'group.name'
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
