import { ProxyState } from '../AppState.js'
import { Car } from '../Models/Car.js'
import { api } from './AxiosService.js'
class CarsService {
  async deleteCar(carId) {
    await api.delete('api/cars/' + carId)
    ProxyState.cars = ProxyState.cars.filter(c => c.id !== carId)
  }

  async addCar(carData) {
    const res = await api.post('api/cars/', carData)
    console.log(res.data)
    ProxyState.cars = [...ProxyState.cars, new Car(res.data)]
  }

  async getCars() {
    const res = await api.get('api/cars/')
    ProxyState.cars = res.data.map(c => new Car(c))
    console.log(ProxyState.cars)
  }
}

// singleton pattern
export const carsService = new CarsService()
