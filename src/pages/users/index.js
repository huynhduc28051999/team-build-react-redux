/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef, useCallback, useReducer } from 'react'
import * as moment from 'moment'
import { AgGridReact } from 'ag-grid-react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUser } from '@actions/user'
import AvatarDetail from '@components/avatarDetail'
import { Button, Spin, Modal } from 'antd'
import UserForm from './userForm'
import stateReducer from '@components/commonFun/stateReducer'

const genderInterface = {
  MALE: 'Nam',
  FEMALE: 'Nữ',
  ORTHER: 'Khác'
}

function User() {
  const [state, setState] = useReducer(stateReducer, {
    showEdit: false,
    showDelete: false
  })
  const gridApi = useRef()
  const drawerRef = useRef()
  const users = useSelector(state => state.user.users)
  // console.log();
  const isLoadingGet = useSelector(state => state.user.isLoadingGet)
  const dispatch = useDispatch()
  const { showEdit, showDelete } = state
  useEffect(() => {
    dispatch(getAllUser())
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
        checkboxSelection: true,
        pined: 'left'
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
    rowData: users || [],
    defaultColDef: {
      sortable: true,
      resizable: true,
      floatingFilter: true,
      filter: true
    },
    rowSelection: 'multiple', // single
    onGridReady: (params) => {
      gridApi.current = params.api
      // params.api.sizeColumnsToFit()
    },
    onFirstDataRendered: (params) => {
      // params.api.sizeColumnsToFit()
    },
    onRowClicked: (params) => {
      const row = params.api.getSelectedRows()
      if (row.length > 1) {
        setState({
          showDelete: true,
          showEdit: false
        })
      } else if (row[0]) {
        setState({
          showDelete: true,
          showEdit: true
        })
      } else {        
        setState({
          showDelete: false,
          showEdit: false
        })
      }
    },
    onRowSelected: (params) => {
      const row = params.api.getSelectedRows()
      if (row.length > 1) {
        setState({
          showDelete: true,
          showEdit: false
        })
      } else if (row[0]) {
        setState({
          showDelete: true,
          showEdit: true
        })
      } else {
        setState({
          showDelete: false,
          showEdit: false
        })
      }
    },
    frameworkComponents: {
      avatarRenderer: AvatarDetail
    }
  }
  const hadleOpenDrawer = useCallback((isAdd = true) => {
    const groups = gridApi.current?.getSelectedRows()
    if (isAdd) {
      drawerRef.current?.handleOpen()
    } else {
      drawerRef.current?.handleOpen(groups[0])
    }
  }, [gridApi])
  const handleDelete = useCallback(() => {
    const groups = gridApi.current.getSelectedRows()
    Modal.confirm({
      okText: 'Có',
      cancelText: 'Không',
      title: 'Bạn muốn xóa các nhân viên đang chọn ?',
      onOk: () => {
        const ids = groups?.map(item => item._id)
        // dispatch(deleteGroup({ ids }))
      }
    })
  }, [])
  return (
    <div className='ag-grid-custom site-drawer-render-in-current-wrapper'>
      <div className='header-def'>
        <Button onClick={hadleOpenDrawer}>Thêm</Button>
        <Button onClick={() => hadleOpenDrawer(false)} disabled={!showEdit}>Sửa</Button>
        <Button onClick={handleDelete} disabled={!showDelete}>Xóa</Button>
      </div>
      <div
        className='ag-theme-alpine'
        style={{
          height: 'calc(100vh - 180px)'
        }}>
          <Spin spinning={isLoadingGet} />
          <AgGridReact
            floatingFilter
            loading
            {...gridOptions}
          />
      </div>
      <UserForm
        drawerRef={drawerRef}
      />
    </div>
  )
}

export default User
