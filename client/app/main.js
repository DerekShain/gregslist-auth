import { AuthController } from './Controllers/AuthController.js'
import { ValuesController } from './Controllers/ValuesController.js'
import { CarsController } from './Controllers/CarsController.js'
import { HousesController } from './Controllers/HousesController.js'
import { JobsController } from './Controllers/JobsController.js'

class App {
  authController = new AuthController();
  valuesController = new ValuesController();
  carsController = new CarsController()
  housesController = new HousesController()
  jobsController = new JobsController()
}

// @ts-ignore
window.app = new App()
