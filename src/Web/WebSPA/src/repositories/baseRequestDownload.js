import axios from 'axios'

const baseURL = 'https://minio-server-project.appspot.com/api'

export default axios.create({
  baseURL: baseURL
})
