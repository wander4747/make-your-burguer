import axios from 'axios'
import IngredientsService from './ingredients'
import BurguerService from './burguers'
import OrderService from './orders'
import StatusService from './status'

const API_ENVS = {
  local: 'http://localhost:3000',
}

const httpClient = axios.create({
  baseURL: API_ENVS[process.env.NODE_ENV] || API_ENVS.local
})
  
export default {
  ingredients: IngredientsService(httpClient),
  burguers: BurguerService(httpClient),
  orders: OrderService(httpClient),
  status: StatusService(httpClient),
}
