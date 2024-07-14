import List from '@/core/application/usecase/pedido/list.use-case'
import Pedido from '@/core/domain/entities/pedido'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'
import { PedidoGateway } from '@/core/operation/gateway/pedido.gateway'

describe('List class tests', () => {
  let usecase:List

  let mockPedidoGateway:PedidoGateway
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

    mockPedidoGateway = new PedidoGateway(mockPedidoRepository)
    usecase = new List(mockPedidoGateway)
  })

  it('constructor class test', async () => {
    expect(usecase).toBeInstanceOf(List)
  })

  it('handle method test', async () => {
    const pedido = new Pedido()
    mockListPedido.mockResolvedValue([pedido])
    const result = await usecase.handle()
    expect(mockListPedido).toHaveBeenCalledTimes(1)
    expect(result).toEqual([pedido])
  })
})
