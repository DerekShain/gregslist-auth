import { carsService } from '../services/CarsService.js'
import BaseController from '../utils/BaseController.js'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { logger } from '../utils/Logger.js'

export class CarsController extends BaseController {
  constructor() {
    super('api/cars')
    this.router
      .get('', this.getCars)
      .use(Auth0Provider.getAuthorizedUserInfo) // NOTE this is middleware
      .post('', this.createCar)
      .delete('/:carId', this.removeCar)
      .put('/:carId', this.editCar)
  }

  async getCars(req, res, next) {
    try {
      const cars = await carsService.getCars(req.query)
      res.send(cars)
    } catch (error) {
      next(error)
    }
  }

  async getCar(req, res, next) {
    try {
      const car = await carsService.getCarById(req.params.carId)
      res.send(car)
    } catch (error) {

    }
  }

  async createCar(req, res, next) {
    try {
      logger.log('Who is this?', req.userIno)
      // REVIEW never trust the client
      // force the creatorId to be loggedin user
      req.body.creatorId = req.userInfo.id
      const car = await carsService.createCar(req.body)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async removeCar(req, res, next) {
    try {
      const car = await carsService.removeCar(req.params.carId, req.userInfo.id)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async editCar(req, res, next) {
    try {
      const car = await carsService.editCar(req.params.carId, req.userInfo.id, req.body)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }
}
