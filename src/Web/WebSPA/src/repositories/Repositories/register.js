import Repository from '../baseRequestDownload'
export default {
  exportReport (params) {
    return Repository.get(`users/loginGmail${params}`)
  }
}
