import { ProxyState } from '../AppState.js'
import { Job } from '../Models/Job.js'
import { api } from './AxiosService.js'
class JobsService {
  async deleteJob(jobId) {
    await api.delete('api/jobs/' + jobId)
    ProxyState.jobs = ProxyState.jobs.filter(c => c.id !== jobId)
  }

  async addJob(jobData) {
    const res = await api.post('api/jobs/', jobData)
    ProxyState.jobs = [...ProxyState.jobs, new Job(res.data)]
  }

  async getJobs() {
    const res = await api.get('api/jobs/')
    ProxyState.jobs = res.data.map(j => new Job(j))
  }
}

// singleton pattern
export const jobsService = new JobsService()
