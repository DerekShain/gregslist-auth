import { housesService } from '../services/HousesService.js'
import BaseController from '../utils/BaseController.js'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { logger } from '../utils/Logger.js'

export class HousesController extends BaseController {
  constructor() {
    super('api/houses')
    this.router
      .get('', this.getHouses)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createHouse)
      .delete('/:houseId', this.removeHouse)
      .put('/:houseId', this.editHouse)
  }

  async getHouses(req, res, next) {
    try {
      const houses = await housesService.getHouses(req.query)
      res.send(houses)
    } catch (error) {
      next(error)
    }
  }

  async getHouse(req, res, next) {
    try {
      const house = await housesService.getHouseById(req.params.houseId)
      res.send(house)
    } catch (error) {

    }
  }

  async createHouse(req, res, next) {
    try {
      logger.log('Who is this?', req.userIno)
      req.body.creatorId = req.userInfo.id
      const house = await housesService.createHouse(req.body)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async removeHouse(req, res, next) {
    try {
      const house = await housesService.removeHouse(req.params.houseId, req.userInfo.id)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async editHouse(req, res, next) {
    try {
      const house = await housesService.editHouse(req.params.houseId, req.userInfo.id, req.body)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }
}
