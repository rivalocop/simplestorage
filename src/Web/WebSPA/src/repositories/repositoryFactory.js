import LoginRepository from './Repositories/LoginRepository'

const repositories = {
  // add your repository here and set "name" to get
  // "name" : repository name
  // only use for Authorization call
  login: LoginRepository
}

export const RepositoryFactory = {
  get: name => repositories[name] // do not edit this
}
