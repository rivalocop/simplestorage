import axios from 'axios'

const baseDomain = 'http://localhost:3007' // Binh's domain
const baseURL = `${baseDomain}`

export default axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
