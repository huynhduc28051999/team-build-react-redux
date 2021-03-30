import io from "socket.io-client"
import { URL_BACKEND } from "@constants/apiUrl"
import React from 'react'

const token = localStorage.getItem('access-token')
const authorization = `Bearer ${token}` || ''

export const getSocket = () => {
  if (authorization) {
    return io.connect(URL_BACKEND, {
      query: { authorization }
    });
  }
  return io.connect(URL_BACKEND);
};
export const SocketContext = React.createContext()