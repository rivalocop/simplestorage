import Repository from '../baseRequest'
const qs = require('qs');

export default {
  login (payload) {
    return Repository.post(`login`, 
      qs.stringify({
        name: payload.name,
        password: payload.password
      })
    )
  },
  register (payload) {
    return Repository.post(`register`,
      qs.stringify({
        name: payload.userName,
        password: payload.password,
        email: payload.email
      })
    )
  },
  loginWithGmail (payload) {
    return Repository.post(`loginGmail`,
      qs.stringify({
        email: payload.email
      })
    )
  },
  checkUser (payload) {
    return Repository.post(`checkUser`,
      qs.stringify({
        id: payload.userID
      })
    )
  }
}
