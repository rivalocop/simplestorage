import LoginRepository from './Repositories/LoginRepository'
import ManageStorage from './Repositories/ManageStorage'

const repositories = {
  // add your repository here and set "name" to get
  // "name" : repository name
  // only use for Authorization call
  login: LoginRepository,
  manageStorage: ManageStorage
}

export const RepositoryFactory = {
  get: name => repositories[name] // do not edit this
}
