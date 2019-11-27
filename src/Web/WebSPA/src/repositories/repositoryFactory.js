import downloadFormRepository from './Repositories/downloadFormRepository'
import downloadReportRepository from './Repositories/downloadReportRepository'

const repositories = {
  // add your repository here and set "name" to get
  // "name" : repository name
  // only use for Authorization call
  download: downloadFormRepository,
  downloadReport: downloadReportRepository
}

export const RepositoryFactory = {
  get: name => repositories[name] // do not edit this
}
