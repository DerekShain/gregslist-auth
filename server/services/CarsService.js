import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class CarsService {
  async getCarById(carId) {
    const car = await dbContext.Cars.findById(carId).populate('creator', 'name picture')
    if (!car) {
      throw new BadRequest('invalid car id')
    }
    return car
  }

  async editCar(carId, userId, carData) {
    const car = await this.getCarById(carId)
    if (userId !== car.creatorId.toString()) {
      throw new Forbidden('not authorized')
    }
    car.make = carData.make || car.make
    car.model = carData.model || car.model
    car.price = carData.price || car.price
    car.description = carData.description || car.description
    car.year = carData.year || car.year
    car.img = carData.img || car.img
    await car.save()
    return car
    // ANCHOR you can also use this const car = await dbContext.Cars.findOneAndUpdate({_id: carId, creatorId: userId}, carData)
    // return car
  }

  async removeCar(carId, userId) {
    const car = await this.getCarById(carId)
    if (userId !== car.creatorId.toString()) {
      throw new Forbidden('You are not authorized')
    }
    await car.remove()
    return car
  }

  async createCar(carData) {
    const car = await dbContext.Cars.create(carData)
    await car.populate('creator', 'name picture').execPopulate()
    return car
  }

  async getCars(query) {
    const cars = await dbContext.Cars.find(query).populate('creator', 'name picture')
    return cars
  }
}

export const carsService = new CarsService()
