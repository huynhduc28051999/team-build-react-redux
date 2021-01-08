import { notification } from "antd";

export const OpenNotification = ({ type, description, title}) => {
  switch (type) {
    case 'success':
      notification.success({
        placement: 'topRight',
        description,
        message: title,
        duration: 1.5
      })
      break;
    
    case 'error':
      notification.error({
        placement: 'topRight',
        description,
        message: title,
        duration: 1.5
      })
      break;
  
    default:
      break;
  }
}