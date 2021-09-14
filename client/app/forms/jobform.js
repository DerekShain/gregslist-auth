export function getJobFormTemplate() {
  return /* html */`
    <form class="bg-dark rounded p-3 shadow visually-hidden" onsubmit="app.jobsController.addJob()" id="job-form">
    <div class="form-group">
        <label for="jobTitle" class="">Job Title:</label>
        <input type="text" class="form-control" name="jobTitle" id="jobTitle" required>
    </div>
    <div class="form-group">
        <label for="company" class="">Company:</label>
        <input type="text" class="form-control" name="company" id="company" required>
    </div>
    <div class="form-group">
        <label for="rate" class="">rate:</label>
        <input type="number" class="form-control" name="rate" id="rate" required>
    </div>
    <div class="form-group">
        <label for="hours" class="">hours:</label>
        <input type="text" class="form-control" name="hours" id="hours" required>
    </div>
    <div class="form-group">
        <label for="description" class="">Description:</label>
        <textarea type="text" class="form-control" name="description" id="description" rows="5" required></textarea>
    </div>
    <div class="button-group my-3">
      <button type="reset" class="btn btn-secondary">Clear</button>
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
    </form>
    `
}
