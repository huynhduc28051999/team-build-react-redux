import io from "socket.io-client"
import { URL_BACKEND } from "@constants/apiUrl"

const token = localStorage.getItem('access-token')
let sockect
const authorization = `Bearer ${token}` || ''
const initiateSocket = () => {
  sockect = io.connect(URL_BACKEND, { query: { authorization }})
}
export { sockect, initiateSocket }