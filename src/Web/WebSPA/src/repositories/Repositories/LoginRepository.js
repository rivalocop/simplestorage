import Repository from '../baseRequest'
const qs = require('qs');

export default {
  login (payload) {
    return Repository.post(`users/login`, 
      qs.stringify({
        name: payload.name,
        password: payload.password
      })
    )
  },
  register (payload) {
    return Repository.post(`users/register`,
      qs.stringify({
        name: payload.userName,
        password: payload.password,
        email: payload.email
      })
    )
  },
  loginWithGmail (payload) {
    return Repository.post(`users/loginGmail`,
      qs.stringify({
        email: payload.email
      })
    )
  },
  checkUser (payload) {
    return Repository.post(`users/checkUser`,
      qs.stringify({
        id: payload.userID
      })
    )
  }
}
