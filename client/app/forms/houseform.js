export function getHouseFormTemplate() {
  return /* html */`
    <form class = "bg-dark rounded p-3 shadow visually-hidden" onsubmit="app.housesController.addHouse()" id="house-form">
    <div class="form-group">
      <label for="year" class="">Year Built:</label>
      <input type="text" class="form-control" name="year" id="year" required>
    </div>
    <div class="form-group">
      <label for="bedrooms" class="">bedrooms:</label>
      <input type="text" class="form-control" name="bedrooms" id="bedrooms" required>
    </div>
    <div class="form-group">
      <label for="bathrooms" class="">bathrooms:</label>
      <input type="text" class="form-control" name="bathrooms" id="bathrooms" required>
    </div>
    <div class="form-group">
      <label for="levels" class="">levels:</label>
      <input type="text" class="form-control" name="levels" id="levels" required>
    </div>
    <div class="form-group">
      <label for="price" class="">Price:</label>
      <input type="text" class="form-control" name="price" id="price" required>
    </div>
    <div class="form-group">
      <label for="description" class="">Description:</label>
      <textarea type="text" class="form-control" name="description" id="description" rows="5"></textarea>
    </div>
    <div class="form-group">
      <label for="img" class="">Image:</label>
      <input type="url" class="form-control" name="img" id="img">
    </div>
    <div class="button-group my-3">
      <button type="reset" class="btn btn-secondary">Clear</button>
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
    </form>
    `
}
