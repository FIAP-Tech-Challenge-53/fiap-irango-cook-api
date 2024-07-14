import Pedido from '@/core/domain/entities/pedido'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'
import { PedidoGateway } from '@/core/operation/gateway/pedido.gateway'
import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'

describe('Test PedidoGateway class', () => {
  let gateway:PedidoGateway

  let mockPedidoRepository:jest.Mocked<IPedidoRepository>

  beforeEach(() => {
    mockPedidoRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findById: jest.fn()
    }

    gateway = new PedidoGateway(mockPedidoRepository)
  })

  it('Testing class constructor', () => {
    expect(gateway).toBeInstanceOf(PedidoGateway)
  })

  it('list method test', async () => {
    const dto = {
      id: 1,
      consumidorId: '1',
      status: PedidoStatusEnum.PREPARACAO,
      itens: []
    }

    const pedido = new Pedido(dto);

    mockPedidoRepository.find.mockResolvedValue([pedido]);

    let result = await gateway.list();

    expect(mockPedidoRepository.find).toHaveBeenCalledTimes(1);
    expect(result).toEqual([pedido]);
  })

  it('create method test', async () => {
    const pedido = new Pedido()
    mockPedidoRepository.create.mockResolvedValue(pedido)
    const result = await gateway.create(pedido)
    expect(mockPedidoRepository.create).toHaveBeenCalledTimes(1)
    expect(mockPedidoRepository.create).toHaveBeenCalledWith(pedido)
    expect(result).toEqual(pedido);
  })

  it('save method test', async () => {
    const pedido = new Pedido()
    mockPedidoRepository.save.mockResolvedValue(pedido)
    const result = await gateway.save(pedido)
    expect(mockPedidoRepository.save).toHaveBeenCalledTimes(1)
    expect(mockPedidoRepository.save).toHaveBeenCalledWith(pedido)
    expect(result).toEqual(pedido)
  })

  it('findById method test', async () => {
    const dto = {
      id: 1,
      consumidorId: '1',
      status: PedidoStatusEnum.PREPARACAO,
      itens: []
    }

    const pedido = new Pedido(dto);

    mockPedidoRepository.findById.mockResolvedValue(pedido);

    let result = await gateway.findById(1);

    expect(mockPedidoRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockPedidoRepository.findById).toHaveBeenCalledWith(1);
    expect(result).toEqual(pedido);
  })
})
