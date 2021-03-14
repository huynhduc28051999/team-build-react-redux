import React, { useRef, useEffect } from 'react'
import ItemComment from './itemComment'
import './index.scss'
import { Input } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { feedbackByEvent } from '@actions/event'
import { OpenNotification } from '@components/Notification'
import axiosClient from '@utils/axiosClient'
import { URL_API_ADD_FEEDBACK } from '@constants/apiUrl'

export default function Comment({ idEvent }) {
  const feedbacks = useSelector(state => state.event.feedbackByEvent)
  const dispatch = useDispatch()
  const inputRef = useRef()
  useEffect(() => {
    dispatch(
      feedbackByEvent({ idEvent })
    )
  }, [idEvent])
  
  const handleSubmit = async() => {
    console.log(inputRef.current)
    const comment = inputRef.current?.state?.value
    if (comment) {
      try {
        const { data } = await axiosClient.post(URL_API_ADD_FEEDBACK, { idEvent, content: comment })
        if (data) {
          OpenNotification({
            type: 'success',
            title: 'Thành công',
          })
          dispatch(
            feedbackByEvent({ idEvent })
          )
          inputRef.current.handleReset()
        }
      } catch (error) {
        OpenNotification({
          type: 'error',
          description: error,
          title: 'Lỗi',
        })
      }
    } else {
      OpenNotification({
        type: 'error',
        title: 'Vui lòng nhập bình luận'
      })
    }
  }
  return (
    <div className='comment-container'>
      <div className='commnented'>
        {feedbacks.map((item, idx) => (
          <ItemComment data={item} key={idx} />
        ))}
      </div>
      <div className='action'>
        <Input
          placeholder='Nhập bình luận'
          ref={inputRef}
          addonAfter={<SendOutlined style={{ cursor: 'pointer' }} onClick={handleSubmit} />}
          onPressEnter={handleSubmit}
        />
      </div>
    </div>
  )
}
