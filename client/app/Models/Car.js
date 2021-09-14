import { ProxyState } from '../AppState.js'

export class Car {
  constructor(carData) {
    this.id = carData.id
    this.make = carData.make
    this.model = carData.model
    this.year = carData.year
    this.description = carData.description
    this.price = carData.price
    this.img = carData.img
    this.creator = carData.creator
    this.creatorId = carData.creatorId
    this.name = carData.creator.name || ''
    this.userPic = carData.creator.picture || ''
  }

  get CardTemplate() {
    return /* html */`
        <div class="col-lg-3 mb-4 listing p-3 ">
        <div class="card bg-dark">
          <img src="${this.img}" alt="listing image" class="rounded">
          <div class="card-body">
            <h6 class="d-flex justify-content-between">
              <span>${this.make}-${this.model}</span>
              <span>$ ${this.price}</span>
            </h6>
            <p>${this.description}</p>
            <img src="${this.userPic}" title="Posted by ${this.name}">
            <i class="fas fa-trash-alt ${this.creatorId !== ProxyState.account.id ? 'visually-hidden' : ''}" onclick="app.carsController.deleteCar('${this.id}')"></i>
          </div>
          </div>
        </div>
      `
  }
}
