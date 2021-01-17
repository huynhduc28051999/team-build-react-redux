import React, { useEffect } from 'react'
import { Select } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { searchGroup as searchDispath } from '@actions/group'

const { Option } = Select

let timeTypingKeyboard
function SearchGroup(props) {
  const searchGroup = useSelector(state => state.group.searchGroup)
  const dispatch = useDispatch()
  const onSearch = (value) => {
    if (value) {
      if (timeTypingKeyboard) {
        clearTimeout(timeTypingKeyboard)
      }
      timeTypingKeyboard = setTimeout(() => {
        dispatch(searchDispath({ keyword: value }))
      }, 200)
    }
  }
  useEffect(() => {
    if (props.value) {
      onSearch(props.value)
    }
  }, [props.value])
  return (
    <Select
      {...props}
      showSearch
      placeholder='Gõ để tìm kiếm phòng ban'
      optionFilterProp='children'
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {searchGroup.map(item => (
        <Option key={item._id} value={item._id}>{item.name}</Option>
      ))}
    </Select>
  )
}

export default SearchGroup
