import axios from 'axios'

const baseDomain = 'http://1.1.1.1:8080' // Khanh's domain
const baseURL = `${baseDomain}`

export default axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: 'GSA ' + localStorage.getItem('accessToken'),
    'Content-Type': 'application/json'
  }
})
