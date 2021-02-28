import React, { useEffect, useRef, useCallback, useState } from 'react'
import * as moment from 'moment'
import { AgGridReact } from 'ag-grid-react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllEvent } from '@actions/event'
import AvatarDetail from '@components/avatarDetail'
import { Button, Modal } from 'antd'
import ModalViewEvent from './modal/modalViewEvent'

const objState = {
  PROCESSING: 'Đang diễn ra',
  COMPLETED: 'Đã hoàn thành',
  CANCELLED: 'Đã Hủy'
}

const EventGrid = ({ toggleShowList }) => {
  const [showDetail, setShowDetail] = useState(false)
  const [eventSelected, setEventSelected] = useState(false)
  const gridApi = useRef()
  const modalRef = useRef()
  const events = useSelector(state => state.event.events)
  const isLoadingGet = useSelector(state => state.event.isLoadingGet)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllEvent())
  }, [])
  useEffect(() => {
    if (isLoadingGet) {
      gridApi.current?.showLoadingOverlay()
    } else {
      gridApi.current?.hideOverlay()
    }
  }, [isLoadingGet])
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
        cellRenderer: 'avatarRenderer',
        pined: 'left'
      },
      {
        headerName: 'Tên sự kiện',
        field: 'name'
      },
      {
        headerName: 'Tình trạng',
        field: 'state',
        valueGetter: ({ data }) => objState[data.state]
      },
      {
        headerName: 'Đã khóa',
        field: 'isLocked',
        valueGetter: ({ data }) => data.isLocked ? 'Đã khóa' : ''
      },
      {
        headerName: 'Ngày diễn ra',
        field: 'date',
        valueFormatter: ({ value }) => moment(value).format('HH:mm DD/MM/YYYY'),
      },
      {
        headerName: 'Phòng ban',
        field: 'group.name'
      },
    ],
    rowData: events,
    defaultColDef: {
      sortable: true,
      resizable: true,
      floatingFilter: true,
      filter: true
    },
    rowSelection: 'single',
    onGridReady: (params) => {
      gridApi.current = params.api
      params.api.sizeColumnsToFit()
    },
    onFirstDataRendered: (params) => {
      params.api.sizeColumnsToFit()
    },
    onRowClicked: (params) => {
      const row = params.api.getSelectedRows()
      if (row.length === 1) {
        setShowDetail(true)
        setEventSelected(row[0])
      } else {     
        setShowDetail(false)
      }
    },
    frameworkComponents: {
      avatarRenderer: AvatarDetail
    }
  }
  const handleViewDetailClick = useCallback(() => {
    modalRef.current?.openModal(eventSelected)
  }, [eventSelected])
  return (
    <>
      <div className='ag-grid-custom site-drawer-render-in-current-wrapper'>
        <div className='header-def'>
          <Button size="small" type="text" onClick={toggleShowList}>
            Quản lý sự kiện
          </Button>
          <Button size="small" onClick={handleViewDetailClick} disabled={!showDetail}>Xem chi tiết</Button>
        </div>
        <div
          className='ag-theme-alpine'
          style={{
            height: 'calc(100vh - 8rem)'
          }}>
            <AgGridReact
              floatingFilter
              loading
              {...gridOptions}
            />
        </div>
      </div>
      <ModalViewEvent ref={modalRef} />
    </>
  )
}

export default EventGrid
