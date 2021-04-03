import React, { useRef, useEffect, useContext } from 'react'
import ItemComment from './itemComment'
import './index.scss'
import { Input } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { feedbackByEvent, addCommentAction } from '@actions/event'
import { OpenNotification } from '@components/Notification'
import axiosClient from '@utils/axiosClient'
import { URL_API_ADD_FEEDBACK } from '@constants/apiUrl'
import { SocketContext } from '@utils/socket'

export default function Comment({ idEvent, event }) {
  const feedbacks = useSelector(state => state.event.feedbackByEvent)
  const dispatch = useDispatch()
  const inputRef = useRef()

  const { socket } = useContext(SocketContext)
  const handleListener = (data) => {
    dispatch(addCommentAction(data))
  }

  useEffect(() => {
    dispatch(
      feedbackByEvent({ idEvent })
    )
    if (event?.voteOfMe) {
      socket.emit('joinRoom', idEvent)
      socket.on('comment', handleListener)
    }
  }, [idEvent])
  useEffect(() => {
    let elem = document.querySelector('#commnented')
    elem.scrollTop = elem.scrollHeight
  }, [feedbacks.length])
  
  const handleSubmit = async() => {
    const comment = inputRef.current?.state?.value
    if (comment) {
      try {
        const { data } = await axiosClient.post(URL_API_ADD_FEEDBACK, { idEvent, content: comment })
        if (data) {
          OpenNotification({
            type: 'success',
            title: 'Thành công',
          })
          // dispatch(
          //   feedbackByEvent({ idEvent })
          // )
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
      <div className='commnented' id='commnented'>
        {feedbacks.map((item, idx) => (
          <ItemComment data={item} key={idx} />
        ))}
      </div>
      <div className='action'>
        <Input
          disabled={!event?.voteOfMe}
          placeholder='Nhập bình luận'
          ref={inputRef}
          addonAfter={<SendOutlined style={{ cursor: 'pointer' }} onClick={handleSubmit} />}
          onPressEnter={handleSubmit}
        />
      </div>
    </div>
  )
}
