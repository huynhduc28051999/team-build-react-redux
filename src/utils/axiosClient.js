import axios from 'axios'
import queryString from 'query-string'
import { URL_BACKEND } from '@constants/apiUrl'

const axiosClient = axios.create({
  baseURL: URL_BACKEND,
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: param => queryString.stringify(param)
})

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('access-token')
  config.headers.Authorization = `Bearer ${token}` || ''
  return config
})

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data
  }
  return response
}, function(error) {
  if (error.response.status === 401 || error.response.status === 403) {
    localStorage.clear('access-token')
    document.location.href = '/login'
  }
  return Promise.reject(error.response?.data?.message)
})

export default axiosClient