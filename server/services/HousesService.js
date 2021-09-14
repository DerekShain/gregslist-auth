import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class HousesService {
  async getHouseById(houseId) {
    const house = await dbContext.Houses.findById(houseId).populate('creator', 'name picture')
    if (!house) {
      throw new BadRequest('invalid house id')
    }
    return house
  }

  async editHouse(houseId, userId, houseData) {
    const house = await this.getHouseById(houseId)
    if (userId !== house.creatorId.toString()) {
      throw new Forbidden('not authorized')
    }
    house.bedrooms = houseData.bedrooms || house.bedrooms
    house.bathrooms = houseData.bathrooms || house.bathrooms
    house.levels = houseData.levels || house.levels
    house.description = houseData.description || house.description
    house.year = houseData.year || house.year
    house.img = houseData.img || house.img
    house.price = houseData.price || house.price
    await house.save()
    return house
  }

  async removeHouse(houseId, userId) {
    const house = await this.getHouseById(houseId)
    if (userId !== house.creatorId.toString()) {
      throw new Forbidden('You are not authorized')
    }
    await house.remove()
    return house
  }

  async createHouse(houseData) {
    const house = await dbContext.Houses.create(houseData)
    await house.populate('creator', 'name picture').execPopulate()
    return house
  }

  async getHouses(query) {
    const houses = await dbContext.Houses.find(query).populate('creator', 'name picture')
    return houses
  }
}

export const housesService = new HousesService()
