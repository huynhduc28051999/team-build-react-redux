import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGroupById } from '@actions/group'
import './index.scss'
import { Row, Col } from 'antd'
import { Loading } from '@components'
import AvatarEventDefault from '@assets/images/avatar_event_default.jpg'
import AvatarUserDefault from '@assets/images/userDefault.png'
import BackgroundDefault from '@assets/images/background-default.jpg'

const DetailGroup = (props) => {
  const { match, history, permission } = props
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.group.isLoading)
  const groupById = useSelector((state) => state.group.groupById)

  const handleClickDetail = (id) => {
    history.push(`/detailEvent/${id}`)
  }

  useEffect(() => {
    if (!match.params._id) {
      history.goBack()
    } else {
      dispatch(getGroupById(match.params._id))
    }
  }, [])
  return (
    <div className="detail-group">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="detail-group__container-title">
            <div className="detail-group__title">
              <img src={groupById?.background || BackgroundDefault} width='100%' height={450} />
              <div className="detail-group__title-content">{groupById?.title}
                <div className="intro__text-shadow">{groupById?.name}</div>
              </div>
            </div>
          </div>
          <div className="ldp">
            <div className="detail-group__container">
              <Row>
                <Col span={12}>
                  <h2>GIỚI THIỆU NHÓM HOẠT ĐỘNG</h2>
                  <div className="line"></div>
                  <div className="include">
                    Mô tả ngắn gọn về điểm chính của nhóm
                  </div>
                </Col>
                <Col span={12}>
                  <p>{groupById?.description}</p>
                </Col>
              </Row>
            </div>
          </div>
          <div className="detail-group__container">
            <div className="line" />
          </div>
          <div className="list-event">
            <div className="detail-group__container">
              <div className="body-tilte-text">
                <h2>Các sự kiện của nhóm</h2>
              </div>
              {groupById?.events?.map((item, idx) => (
                <div className="inline-block" key={`event_${idx}`}>
                  <img src={item.avatar || AvatarEventDefault} />
                  <h3>{item.name}</h3>
                  <p className='text'>{item.description}</p>
                  {permission.code === 'USER' && <button onClick={() => handleClickDetail(item._id)}>Xem chi tiết</button>}
                </div>
              ))}
            </div>
          </div>
          <div className="list-user">
            <div className="detail-group__container">
              <h2>THÀNH VIÊN NHÓM</h2>
              <Row className="list-user_flex">
                {groupById?.users?.map((item, idx) => (
                  <Col span={6} key={`user_${idx}`}>
                    <div className="avatar">
                      <img src={item.avatar || AvatarUserDefault} />
                    </div>
                    <h6>{item.name}</h6>
                    <i>{item.email}</i>
                    <div className="phone">
                      <i className="fas fa-phone"></i>
                      Tel: {item.phoneNumber}
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default React.memo(DetailGroup)
