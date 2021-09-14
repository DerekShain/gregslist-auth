import { ProxyState } from '../AppState.js'
export class House {
  constructor(houseData) {
    this.id = houseData.id
    this.bedrooms = houseData.bedrooms
    this.bathrooms = houseData.bathrooms
    this.levels = houseData.levels
    this.year = houseData.year
    this.price = houseData.price
    this.img = houseData.img
    this.description = houseData.description
    this.creator = houseData.creator
    this.name = houseData.creator.name || ''
    this.userPic = houseData.creator.picture || ''
    this.creatorId = houseData.creatorId
  }

  get CardTemplate() {
    return /* html */`

      <div class="col-lg-4 mb-4 p-3 listing">
        <div class="card bg-dark">
          <img src="${this.img}" alt="listing image" class="rounded">
          <div class="card-body shadow">
            <h5 class="d-flex justify-content-between">
              <span class="">${this.year}, ${this.bedrooms} Bed, ${this.bathrooms} Bath</span>
              <span>$${this.price}</span>
            </h5>
            <p>${this.levels} levels</p>
            <p>${this.description}</p>
            <img src="${this.userPic}" title="Posted by ${this.name}">
            <i class="fas fa-trash-alt ${this.creatorId !== ProxyState.account.id ? 'visually-hidden' : ''}" onclick="app.housesController.deleteHouse('${this.id}')"></i>
          </div>
          </div>
        </div>
      `
  }
}
