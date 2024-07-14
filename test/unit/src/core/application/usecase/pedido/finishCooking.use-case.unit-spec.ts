import FinishCooking from '@/core/application/usecase/pedido/finishCooking.use-case'
import Pedido from '@/core/domain/entities/pedido'
import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'
import BusinessException from '@/core/domain/errors/business-exception'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'
import { PedidoGateway } from '@/core/operation/gateway/pedido.gateway'
import IRangoOrderService from '@/infra/persistence/service/irango-order.service'

describe('FinishCooking class tests', () => {
  let usecase:FinishCooking

  let mockPedidoGateway:PedidoGateway
  let mockOrderService:jest.Mocked<IRangoOrderService>

  let mockPedidoRepository:jest.Mocked<IPedidoRepository>

  let mockCreatePedido:jest.Mock<any>
  let mockSavePedido:jest.Mock<any>
  let mockListPedido:jest.Mock<any>
  let mockFindByIdPedido:jest.Mock<any>

  beforeEach(() => {
    jest.mock('@/core/operation/gateway/pedido.gateway')

    mockCreatePedido = jest.fn()
    mockSavePedido = jest.fn()
    mockListPedido = jest.fn()
    mockFindByIdPedido = jest.fn()

    PedidoGateway.prototype.create = mockCreatePedido
    PedidoGateway.prototype.save = mockSavePedido
    PedidoGateway.prototype.list = mockListPedido
    PedidoGateway.prototype.findById = mockFindByIdPedido

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

    mockPedidoGateway = new PedidoGateway(mockPedidoRepository)
    usecase = new FinishCooking(mockPedidoGateway, mockOrderService)
  })

  it('constructor class test', async () => {
    expect(usecase).toBeInstanceOf(FinishCooking)
  })

  it('handle method test with pedido not found', async () => {
    mockFindByIdPedido.mockResolvedValue(null)
    await expect(usecase.handle(1)).rejects.toThrow(new BusinessException('Pedido não encontrado'))
  })

  it('handle method test with pedido status equals to PAGAMENTO_PENDENTE', async () => {
    const pedido = new Pedido()
    pedido.status = PedidoStatusEnum.PAGAMENTO_PENDENTE
    mockFindByIdPedido.mockResolvedValue(pedido)
    await expect(usecase.handle(1)).rejects.toThrow(new BusinessException('Pedido não está com status PREPARAÇÃO'))
  })

  it('handle method test with pedido status equals to RECEBIDO', async () => {
    const pedido = new Pedido()
    pedido.status = PedidoStatusEnum.RECEBIDO
    mockFindByIdPedido.mockResolvedValue(pedido)
    await expect(usecase.handle(1)).rejects.toThrow(new BusinessException('Pedido não está com status PREPARAÇÃO'))
  })

  it('handle method test with pedido status equals to FINALIZADO', async () => {
    const pedido = new Pedido()
    pedido.status = PedidoStatusEnum.FINALIZADO
    mockFindByIdPedido.mockResolvedValue(pedido)
    await expect(usecase.handle(1)).rejects.toThrow(new BusinessException('Pedido não está com status PREPARAÇÃO'))
  })

  it('handle method test with pedido found', async () => {
    const pedido = new Pedido()
    pedido.status = PedidoStatusEnum.PREPARACAO
    mockFindByIdPedido.mockResolvedValue(pedido)
    const result = await usecase.handle(1)
    expect(mockSavePedido).toHaveBeenCalledTimes(1)
    expect(mockOrderService.finishCooking).toHaveBeenCalledTimes(1)
    pedido.status = PedidoStatusEnum.PRONTO
    expect(mockSavePedido).toHaveBeenCalledWith(pedido)
    expect(mockOrderService.finishCooking).toHaveBeenCalledWith(pedido.id)
    expect(result).toEqual(pedido)
  })
})
