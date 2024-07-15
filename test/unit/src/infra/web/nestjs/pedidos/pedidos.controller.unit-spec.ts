import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'
import IOrderService from '@/core/domain/services/iorder.service'
import { PedidoController } from '@/core/operation/controllers/pedido.controller'
import RegisterPedidoRequest from '@/infra/web/nestjs/pedidos/dto/register-pedido.request'
import RegisterPedidoResponse from '@/infra/web/nestjs/pedidos/dto/register-pedido.response'
import PedidosController from '@/infra/web/nestjs/pedidos/pedidos.controller'

describe('PedidosController class tests', () => {
  let controller:PedidosController

  let mockPedidoRepository:jest.Mocked<IPedidoRepository>
  let mockOrderService:jest.Mocked<IOrderService>

  let mockRegisterHandler:jest.Mock<any>
  let mockListHandler:jest.Mock<any>
  let mockFindByIdHandler:jest.Mock<any>
  let mockStartCookHandler:jest.Mock<any>
  let mockFinishCookHandler:jest.Mock<any>

  beforeEach(() => {
    mockRegisterHandler = jest.fn()
    mockListHandler = jest.fn()
    mockFindByIdHandler = jest.fn()
    mockStartCookHandler = jest.fn()
    mockFinishCookHandler = jest.fn()

    mockPedidoRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findById: jest.fn()
    }

    mockOrderService = {
      startCooking: jest.fn(),
      finishCooking: jest.fn()
    }

    PedidoController.prototype.register = mockRegisterHandler
    PedidoController.prototype.list = mockListHandler
    PedidoController.prototype.findById = mockFindByIdHandler
    PedidoController.prototype.startCooking = mockStartCookHandler
    PedidoController.prototype.finishCooking = mockFinishCookHandler

    controller = new PedidosController(mockPedidoRepository, mockOrderService)
  })

  it('constructor class test', async () => {
    expect(controller).toBeInstanceOf(PedidosController)
  })

  it('registerPedido method test', async () => {
    const input = new RegisterPedidoRequest()
    const response = new RegisterPedidoResponse()
    mockRegisterHandler.mockResolvedValue(response)
    const result = await controller.registerPedido(input)
    expect(mockRegisterHandler).toHaveBeenCalledTimes(1)
    expect(mockRegisterHandler).toHaveBeenCalledWith(input)
    expect(result).toEqual(response)
  })

  it('list method test', async () => {
    const response = new RegisterPedidoResponse()
    mockListHandler.mockResolvedValue([response])
    const result = await controller.list()
    expect(mockListHandler).toHaveBeenCalledTimes(1)
    expect(result).toEqual([response])
  })

  it('findById method test', async () => {
    const response = new RegisterPedidoResponse()
    mockFindByIdHandler.mockResolvedValue(response)
    const result = await controller.findById(1)
    expect(mockFindByIdHandler).toHaveBeenCalledTimes(1)
    expect(mockFindByIdHandler).toHaveBeenCalledWith(1)
    expect(result).toEqual(response)
  })

  it('startCooking method test', async () => {
    const response = new RegisterPedidoResponse()
    mockStartCookHandler.mockResolvedValue(response)
    const result = await controller.startCooking(1)
    expect(mockStartCookHandler).toHaveBeenCalledTimes(1)
    expect(mockStartCookHandler).toHaveBeenCalledWith(1)
    expect(result).toEqual(response)
  })

  it('finishCooking method test', async () => {
    const response = new RegisterPedidoResponse()
    mockFinishCookHandler.mockResolvedValue(response)
    const result = await controller.finishCooking(1)
    expect(mockFinishCookHandler).toHaveBeenCalledTimes(1)
    expect(mockFinishCookHandler).toHaveBeenCalledWith(1)
    expect(result).toEqual(response)
  })
})
