import axios from 'axios'

const baseDomain = 'http://localhost:3001' // Binh's Domain
const baseURL = `${baseDomain}`

export default axios.create({
  baseURL: baseURL,
  responseType: 'blob',
  headers: {
    Authorization: 'GSA ' + localStorage.getItem('accessToken'),
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': 'attachment;filename=report.xls'
  }
})
