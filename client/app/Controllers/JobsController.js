import { ProxyState } from '../AppState.js'
import { getJobFormTemplate } from '../forms/jobform.js'
import { jobsService } from '../Services/JobsService.js'

function _drawJobs() {
  let template = ''
  ProxyState.jobs.forEach(job => template += job.CardTemplate)
  document.getElementById('listings').innerHTML = template
}

export class JobsController {
  constructor() {
    ProxyState.on('jobs', _drawJobs)
  }

  async addJob() {
    event.preventDefault()
    /**
     * @type {HTMLFormElement}
     */
    // @ts-ignore
    const form = event.target
    // TODO get data from form

    const jobData = {
      jobTitle: form.jobTitle.value,
      company: form.company.value,
      rate: form.rate.value,
      hours: form.hours.value,
      description: form.description.value,
      name: form.name.value
    }

    try {
      await jobsService.addJob(jobData)
    } catch (e) {
      // form.make.classList.add('border-danger')
      console.error('[TODO] ...need to do this', e)
      return
    }
    // @ts-ignore
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'New Job Added!',
      showConfirmButton: false,
      timer: 1500
    })

    form.reset()
  }

  showJobs() {
    _drawJobs()
    document.getElementById('controls').innerHTML = `
      <button class="btn btn-black shadow text-light" onclick="app.jobsController.toggleJobForm()">Add Job</button>
    `
    document.getElementById('forms').innerHTML = getJobFormTemplate()
    jobsService.getJobs()
  }

  toggleJobForm() {
    document.getElementById('job-form').classList.toggle('visually-hidden')
  }

  async deleteJob(jobId) {
    // @ts-ignore
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        await jobsService.deleteJob(jobId)
        // @ts-ignore
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
}
