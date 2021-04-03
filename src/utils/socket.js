import io from "socket.io-client"
import { URL_BACKEND } from "@constants/apiUrl"
import React from 'react'

export const app = {
  socket: null,
  connect: function (token) {
    let self = this;
    if (self.socket) {
      self.socket.destroy()
      delete self.socket
      self.socket = null
    }
    if (token) {
      const authorization = `Bearer ${token}` || ''
      this.socket = io.connect(URL_BACKEND, {
        query: { authorization }
      })
    } else {
      this.socket = io.connect(URL_BACKEND)
    }
    this.socket.on('connect', function () {
      console.log('connected to server');
    })
    this.socket.on('disconnect', function () {
      console.log('disconnected from server')
    })
  }
}

export const SocketContext = React.createContext()