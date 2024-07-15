import { Injectable } from '@nestjs/common'

import axios from 'axios'

import IOrderService from '@/core/domain/services/iorder.service'
import { Environment as envs } from '@/infra/web/nestjs/environment'

@Injectable()
export default class IRangoOrderService implements IOrderService {
  constructor (
  ) {}

  async startCooking (pedidoId: number): Promise<void> {
    console.log(`Confirm cooking start for order with ID ${pedidoId} at IRango Order Service`)

    const url = `${envs.SERVICE_IRANGO_ORDER_API}/v1/pedidos/cook-webhook/start/${pedidoId}`
    try {
      await axios.post(url)
    } catch (error) {
      console.log(`Error: ${error}`)
      console.log(error.response?.data)
    }
  }

  async finishCooking (pedidoId: number): Promise<void> {
    console.log(`Confirm cooking finish for order with ID ${pedidoId} at IRango Order Service`)

    const url = `${envs.SERVICE_IRANGO_ORDER_API}/v1/pedidos/cook-webhook/finish/${pedidoId}`
    try {
      await axios.post(url)
    } catch (error) {
      console.log(`Error: ${error}`)
      console.log(error.response?.data)
    }
  }
}
