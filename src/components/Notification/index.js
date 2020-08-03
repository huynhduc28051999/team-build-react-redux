import { notification } from "antd";

export const OpenNotification = ({ type, description, title}) => {
  switch (type) {
    case 'success':
      notification.success({
        placement: 'bottomRight',
        description,
        message: title
      })
      break;
    
    case 'error':
      notification.error({
        placement: 'bottomRight',
        description,
        message: title
      })
      break;
  
    default:
      break;
  }
}