import Repository from '../baseRequest'
export default {
  login (payload) {
    return Repository.post(`login`, {
      name: payload.name,
      password: payload.password
    })
  },
  register (payload) {
    return Repository.post(`register`, {
      name: payload.userName,
      password: payload.password,
      email: payload.email
    })
  }
}
