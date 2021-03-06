import axios from 'axios'

const baseURL = `http://localhost:3007`

export default axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
