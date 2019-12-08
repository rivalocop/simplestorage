import Repository from '../baseRequest'
const qs = require('qs');

export default {
  insertFile (payload) {
    return Repository.post(`upload/insertFile`, 
      qs.stringify({
        userId: payload.userId,
        listFile: payload.listFile
      })
    )
  },
  deleteFile (payload) {
    return Repository.post(`upload/deleteFile`, 
      qs.stringify({
        userId: payload.userId,
        listFile: payload.listFile
      })
    )
  },
  insertBucket (payload) {
    return Repository.post(`upload/insertBucket`, 
      qs.stringify({
        userId: payload.userId,
        bucket: payload.bucket
      })
    )
  },
  getBucketById (payload) {
    return Repository.get(`upload/getBucketById/${payload.bucketID}`)
  },
  getListFileByUserId (payload) {
    return Repository.get(`upload/getListFileByUserId/${payload.userId}`)
  }
}