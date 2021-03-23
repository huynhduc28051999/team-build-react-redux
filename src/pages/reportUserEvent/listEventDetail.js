import React, { forwardRef, useCallback, useReducer, useImperativeHandle } from 'react'
import { Drawer } from 'antd'
import stateReducer from '@components/commonFun/stateReducer'
import { AgGridReact } from 'ag-grid-react'
import AvatarDetail from '@components/avatarDetail'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { userEventDetail } from '@actions/report'

const objState = {
  PROCESSING: 'Đang diễn ra',
  COMPLETED: 'Đã hoàn thành',
  CANCELLED: 'Đã Hủy'
}

const ListEventDetail = forwardRef((props, ref) =>  {
  const {
    startDate,
    endDate
  } = props
  const rowData = useSelector(state => state.report.userEventDetail)
  const dispatch = useDispatch()
  const [state, setState] = useReducer(stateReducer, {
    visible: false
  })
  const { visible } = state
  const handleOpen = useCallback((idUser) => {
    if (idUser) {
      dispatch(
        userEventDetail({
          idUser,
          startDate,
          endDate
        })
      )
    }
    setState({
      visible: true
    })
  }, [])
  const onClose = useCallback(() => {
    setState({
      visible: false,
    })
  }, [])
  const gridOptions = {
    columnDefs: [
      {
        headerName: 'Ảnh',
        field: 'event.avatar',
        width: 120,
        sortable: false,
        filter: false,
        cellRenderer: 'avatarRenderer',
        pined: 'left'
      },
      {
        headerName: 'Tên sự kiện',
        field: 'event.name'
      },
      {
        headerName: 'Tình trạng',
        field: 'event.state',
        valueGetter: ({ data }) => objState[data.event.state]
      },
      {
        headerName: 'Đã khóa',
        field: 'event.isLocked',
        valueGetter: ({ data }) => data.event.isLocked ? 'Đã khóa' : ''
      },
      {
        headerName: 'Ngày diễn ra',
        field: 'event.date',
        valueFormatter: ({ value }) => moment(value).format('HH:mm DD/MM/YYYY'),
      },
    ],
    rowData: rowData || [],
    defaultColDef: {
      sortable: true,
      resizable: true,
      floatingFilter: true,
      filter: true
    },
    onFirstDataRendered: (params) => {
      setTimeout(() => {
        params.api.sizeColumnsToFit()
      }, 500)
    },
    frameworkComponents: {
      avatarRenderer: AvatarDetail
    }
  }
  useImperativeHandle(ref, () => ({
    handleOpen,
  }))
  return (
    <Drawer
      title={'Chi tiết'}
      placement='right'
      closable={false}
      onClose={onClose}
      width='70%'
      visible={visible}
      getContainer={false}
      style={{ position: 'absolute' }}
    >
      <div
        className='ag-theme-alpine'
        style={{
          height: 'calc(100vh - 10rem)'
        }}>
          <AgGridReact
            floatingFilter
            {...gridOptions}
          />
      </div>
    </Drawer>
  )
})

export default ListEventDetail
