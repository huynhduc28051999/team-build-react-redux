import React, { useEffect, useRef } from 'react'
import { Select, Input, Button, Pagination } from 'antd'
import { useReducer } from 'react'
import stateReducer from '@components/commonFun/stateReducer'
import './index.scss'
import { SearchOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { searchEvent } from '@actions/event'
import ItemEvent from './itemEvent'
import ModalUserManager from './modal'

const { Option } = Select

export default function SearchEvent() {
  const [state, setState] = useReducer(stateReducer, {
    searchBy: 'name',
    keywords: '',
    pageCurrent: 1,
    listEvent: []
  })
  const modalRef = useRef()
  const dispatch = useDispatch()
  const searchEventData = useSelector(state => state.event.searchEvent)
  const handleChangeSearchBy = (value) => {
    setState({
      searchBy: value,
      keywords: value === 'name' ? '' : 'PROCESSING'
    })
  }
  const handleSearchClick = () => {
    dispatch(searchEvent({
      searchBy: state.searchBy,
      keywords: state.keywords
    }))
  }
  const handlePaginationChange = (page) => {
    setState({
      pageCurrent: page,
      listEvent: searchEventData.slice((page - 1) * 5, page * 5)
    })
  }
  useEffect(() => {
    dispatch(searchEvent({}))
  }, [])
  useEffect(() => {
    setState({
      listEvent: searchEventData.slice(0, 5),
      pageCurrent: 1
    })
  }, [JSON.stringify(searchEventData)])
  return (
    <>
      <div className='search-event'>
        <div className='search-event-top'>
          <div className='search-event-title'>
            Tìm kiếm sự kiện
          </div>
          <div className='search-event-action'>
            <Select
              style={{ width: 150, marginRight: 10 }}
              value={state.searchBy}
              onChange={handleChangeSearchBy}
            >
              <Option value='state'>Trạng thái</Option>
              <Option value='name'>Tên</Option>
            </Select>
            <div className='search-event-input'>
              {state.searchBy === 'name' ? (
                <Input placeholder='Nhập tên sự kiện' onChange={(e) => setState({ keywords: e.target.value })} />
              ) : (
                <Select
                  style={{ width: '100% '}}
                  defaultValue='PROCESSING'
                  onChange={(value) => setState({ keywords: value })}
                >
                  <Option value='COMPLETED'>Đã hoàn thành</Option>
                  <Option value='PROCESSING'>Đang xử lý</Option>
                  <Option value='CANCELLED'>Đã hủy</Option>
                </Select>
              )}
            </div>
            <Button
              className='btn-search'
              icon={<SearchOutlined />}
              onClick={handleSearchClick}
            >
              Tìm kiếm
            </Button>
          </div>
        </div>
        <div className='search-event-content'>
          {state.listEvent.map((item, idx) => (
            <ItemEvent key={idx} event={item} modalRef={modalRef} />
          ))}
        </div>
        <div className='search-event-pagination'>
          <Pagination
            defaultCurrent={1}
            total={searchEventData.length}
            showSizeChanger={false}
            defaultPageSize={5}
            onChange={handlePaginationChange}
            current={state.pageCurrent}
          />
        </div>
      </div>
      <ModalUserManager ref={modalRef} />
    </>
  )
}
