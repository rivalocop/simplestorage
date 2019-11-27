import Repository from '../baseRequestDownload'
export default {
  //   getListEveryPeriod (params) {
  //     return Repository.get(`/form/report/${params}`)
  //   }
  getDownloadForm (idUser, idPeriod) {
    return Repository.get(
      `http://172.16.10.189:8080/form/exportForm/${idUser}/${idPeriod}`
    )
  }
}
