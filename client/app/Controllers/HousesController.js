import { ProxyState } from '../AppState.js'
import { getHouseFormTemplate } from '../forms/houseform.js'
import { housesService } from '../Services/HousesService.js'

function _drawHouses() {
  let template = ''
  ProxyState.houses.forEach(house => template += house.CardTemplate)
  document.getElementById('listings').innerHTML = template
}

export class HousesController {
  constructor() {
    // TODO register the listener for houses
    ProxyState.on('houses', _drawHouses)
  }

  async addHouse() {
    event.preventDefault()
    /**
         * @type {HTMLFormElement}
         */
    // @ts-ignore
    const form = event.target

    const houseData = {
      year: form.year.value,
      levels: form.levels.value,
      bedrooms: form.bedrooms.value,
      bathrooms: form.bathrooms.value,
      price: form.price.value,
      description: form.description.value,
      img: form.img.value,
      name: form.name.value
    }

    try {
      await housesService.addHouse(houseData)
    } catch (e) {
      // TODO draw errors
      form.make.classlist.add('border-danger')
      console.error('Need to do this [TODO]', e)
      return
    }
    // @ts-ignore
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'New House Added!',
      showConfirmButton: false,
      timer: 1500
    })
    form.reset()
  }

  showHouses() {
    _drawHouses()
    document.getElementById('controls').innerHTML = `
        <button class="btn btn-black shadow text-light" onclick="app.housesController.toggleHouseForm()">Add House</button>
      `
    document.getElementById('forms').innerHTML = getHouseFormTemplate()
    housesService.getHouses()
  }

  toggleHouseForm() {
    document.getElementById('house-form').classList.toggle('visually-hidden')
    console.log('[TODO fill me in]')
  }

  toggleTemplate() {
    document.getElementById('template-form').classList.toggle('visually-hidden')
    console.log('[TODO fill me in]')
  }

  async deleteHouse(houseId) {
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
        await housesService.deleteHouse(houseId)
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
