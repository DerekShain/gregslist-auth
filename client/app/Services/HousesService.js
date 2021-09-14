import { ProxyState } from '../AppState.js'
import { House } from '../Models/House.js'
import { api } from './AxiosService.js'
class HousesService {
  async deleteHouse(houseId) {
    await api.delete('api/houses/' + houseId)
    ProxyState.houses = ProxyState.houses.filter(h => h.id !== houseId)
  }

  async addHouse(houseData) {
    const res = await api.post('api/houses/', houseData)
    ProxyState.houses = [...ProxyState.houses, new House(res.data)]
  }

  async getHouses() {
    const res = await api.get('api/houses/')
    ProxyState.houses = res.data.map(h => new House(h))
  }
}

export const housesService = new HousesService()
