import Repository from '../baseRequestDownload'
export default {
  exportReport (params) {
    return Repository.get(`/form/exportReport/${params}`)
  }
}
