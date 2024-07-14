import axios from 'axios'

import IRangoOrderService from '@/infra/persistence/service/irango-order.service'
import { Environment as envs } from '@/infra/web/nestjs/environment'

describe('Test IRangoOrderService class', () => {
  let service:IRangoOrderService
  let mockPost:jest.Mock<any>

  beforeEach(() => {
    jest.mock('axios')
    mockPost = jest.fn()
    axios.post = mockPost
    service = new IRangoOrderService()
  })

  it('constructor class test', async () => {
    expect(service).toBeInstanceOf(IRangoOrderService)
  })

  it('startCooking method test without failing', async () => {
    const pedidoId = 1
    const url = `${envs.SERVICE_IRANGO_ORDER_API}/v1/pedidos/cook-webhook/start/${pedidoId}`
    mockPost.mockImplementation(() => {})
    await service.startCooking(pedidoId)
    expect(mockPost).toHaveBeenCalledTimes(1)
    expect(mockPost).toHaveBeenCalledWith(url)
  })

  it('startCooking method test with failing', async () => {
    const pedidoId = 1
    const url = `${envs.SERVICE_IRANGO_ORDER_API}/v1/pedidos/cook-webhook/start/${pedidoId}`
    mockPost.mockImplementation(() => {
      throw new Error('Mocked Error')
    })
    await service.startCooking(pedidoId)
    expect(mockPost).toHaveBeenCalledTimes(1)
    expect(mockPost).toHaveBeenCalledWith(url)
  })

  it('finishCooking method test without failing', async () => {
    const pedidoId = 1
    const url = `${envs.SERVICE_IRANGO_ORDER_API}/v1/pedidos/cook-webhook/finish/${pedidoId}`
    mockPost.mockImplementation(() => {})
    await service.finishCooking(pedidoId)
    expect(mockPost).toHaveBeenCalledTimes(1)
    expect(mockPost).toHaveBeenCalledWith(url)
  })

  it('finishCooking method test with failing', async () => {
    const pedidoId = 1
    const url = `${envs.SERVICE_IRANGO_ORDER_API}/v1/pedidos/cook-webhook/finish/${pedidoId}`
    mockPost.mockImplementation(() => {
      throw new Error('Mocked Error')
    })
    await service.finishCooking(pedidoId)
    expect(mockPost).toHaveBeenCalledTimes(1)
    expect(mockPost).toHaveBeenCalledWith(url)
  })
})
