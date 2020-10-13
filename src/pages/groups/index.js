/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef, useCallback, useReducer } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllGroup, deleteGroup } from '@actions/group'
import AvatarDetail from '@components/avatarDetail'
import { Button, Spin, Modal } from 'antd'
import GroupForm from './groupForm'
import stateReducer from '@components/commonFun/stateReducer'

function Groups() {
  const [state, setState] = useReducer(stateReducer, {
    showEdit: false,
    showDelete: false
  })
  const gridApi = useRef()
  const drawerRef = useRef()
  const groups = useSelector(state => state.group.groups)
  const isLoadingGet = useSelector(state => state.group.isLoadingGet)
  const dispatch = useDispatch()
  const { showEdit, showDelete } = state
  useEffect(() => {
    dispatch(getAllGroup())
  }, [])
  useEffect(() => {
    if (isLoadingGet) {
      gridApi.current?.showLoadingOverlay()
    } else {
      gridApi.current?.hideOverlay()
    }
    setState({
      showEdit: false,
      showDelete: false
    })
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
        headerName: 'Ảnh nhóm',
        field: 'avatar',
        width: 120,
        sortable: false,
        filter: false,
        cellRenderer: 'avatarRenderer',
        checkboxSelection: true
      },
      {
        headerName: 'Tên nhóm',
        field: 'name'
      },
      {
        headerName: 'Mô tả',
        field: 'description'
      },
      {
        headerName: 'Số lượng sự kiện',
        field: 'numberOfEvent',
        filter: 'agNumberColumnFilter'
      },
      {
        headerName: 'Số lượng nhân viên',
        field: 'numberOfUser',
        filter: 'agNumberColumnFilter'
      }
    ],
    rowData: groups || [],
    defaultColDef: {
      sortable: true,
      resizable: true,
      floatingFilter: true,
      filter: true
    },
    rowSelection: 'multiple', // single
    onGridReady: (params) => {
      gridApi.current = params.api
      params.api.sizeColumnsToFit()
    },
    onFirstDataRendered: (params) => {
      params.api.sizeColumnsToFit()
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
      title: 'Bạn muốn xóa các nhóm đang chọn ?',
      onOk: () => {
        const ids = groups?.map(item => item._id)
        dispatch(deleteGroup({ ids }))
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
          height: 'calc(100vh - 5rem)'
        }}>
          <Spin spinning={isLoadingGet} />
          <AgGridReact
            floatingFilter
            loading
            {...gridOptions}
          />
      </div>
      <GroupForm
        drawerRef={drawerRef}
      />
    </div>
  )
}

export default Groups
