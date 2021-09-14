import { ProxyState } from '../AppState.js'
import { getCarFormTemplate } from '../forms/carform.js'
import { carsService } from '../Services/CarsService.js'

function _drawCars() {
  let template = ''
  ProxyState.cars.forEach(car => template += car.CardTemplate)
  document.getElementById('listings').innerHTML = template
}

export class CarsController {
  constructor() {
    ProxyState.on('cars', _drawCars)
    //             ^^^^ magic string must match a property on the appstate
    // carsService.getCars()
  }

  // NOTE Changed this data below.
  async addCar() {
    event.preventDefault() // do not forget this line on form submissions
    /**
     * @type {HTMLFormElement}
     */
    // @ts-ignore
    const form = event.target

    const carData = {
      make: form.make.value,
      model: form.model.value,
      year: form.year.value,
      price: form.price.value,
      description: form.description.value,
      img: form.img.value,
      name: form.name.value

    }

    try {
      await carsService.addCar(carData)
      // NOTE -^^^ this is for error handeling
    } catch (e) {
      // TODO draw errors
      form.make.classList.add('border-danger')
      console.error('[TODO] you were supposed to do this', e)
      return
    }
    // @ts-ignore
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'New Car Added!',
      showConfirmButton: false,
      timer: 1500
    })

    form.reset()
  }

  showCars() {
    _drawCars()
    document.getElementById('controls').innerHTML = `
      <button class="btn btn-black text-light shadow" onclick="app.carsController.toggleCarForm()">Add Car</button>
    `
    document.getElementById('forms').innerHTML = getCarFormTemplate()
    carsService.getCars()
  }

  showMiles() {
    // @ts-ignore
    document.getElementById('miles').textContent = event.target.value
  }

  toggleCarForm() {
    document.getElementById('car-form').classList.toggle('visually-hidden')
  }

  async deleteCar(carId) {
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
        await carsService.deleteCar(carId)
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
