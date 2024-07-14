import FindById from '@/core/application/usecase/pedido/findById.use-case'
import FinishCooking from '@/core/application/usecase/pedido/finishCooking.use-case'
import List from '@/core/application/usecase/pedido/list.use-case'
import Register from '@/core/application/usecase/pedido/register.use-case'
import StartCooking from '@/core/application/usecase/pedido/startCooking.use-case'
import PedidoMapper from '@/core/domain/mappers/pedido.mapper'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'
import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'
import IRangoOrderService from '@/infra/persistence/service/irango-order.service'
import RegisterPedidoRequest from '@/infra/web/nestjs/pedidos/dto/register-pedido.request'
import { PedidoController } from '@/core/operation/controllers/pedido.controller'
import Pedido from '@/core/domain/entities/pedido'

describe('Test for PedidoController Class', () => {

  let controller:PedidoController

  let mockPedidoRepository:jest.Mocked<IPedidoRepository>
  let mockOrderService:jest.Mocked<IRangoOrderService>

  let mockRegisterHandle:jest.Mock<any>
  let mockListHandle:jest.Mock<any>
  let mockFindByIdHandle:jest.Mock<any>
  let mockStartCookingHandle:jest.Mock<any>
  let mockFinishCookingHandle:jest.Mock<any>
  let mockDto:jest.Mock<any>

  beforeEach(() => {
    mockRegisterHandle = jest.fn()
    mockListHandle = jest.fn()
    mockFindByIdHandle = jest.fn()
    mockStartCookingHandle = jest.fn()
    mockFinishCookingHandle = jest.fn()
    mockDto = jest.fn()

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

    PedidoMapper.toDto = mockDto
    Register.prototype.handle = mockRegisterHandle
    List.prototype.handle = mockListHandle
    FindById.prototype.handle = mockFindByIdHandle
    StartCooking.prototype.handle = mockStartCookingHandle
    FinishCooking.prototype.handle = mockFinishCookingHandle

    controller = new PedidoController(mockPedidoRepository, mockOrderService)
  })

  it('constructor class test', async () => {
    expect(controller).toBeInstanceOf(PedidoController)
  })

  it('register method test', async () => {
    const input = new RegisterPedidoRequest()

    const dto = {
      id: 1,
      consumidorId: '1',
      status: PedidoStatusEnum.PREPARACAO,
      itens: []
    }

    const pedido = new Pedido(dto);

    mockRegisterHandle.mockResolvedValue(pedido)
    mockDto.mockReturnValue(dto)

    const result = await controller.register(input)

    expect(mockRegisterHandle).toHaveBeenCalledTimes(1)
    expect(mockDto).toHaveBeenCalledTimes(1)

    expect(mockRegisterHandle).toHaveBeenCalledWith(input)
    expect(mockDto).toHaveBeenCalledWith(pedido)
    expect(result).toEqual(dto)
  })

  it("list method test", async () => {
    const dto = {
      id: 1,
      consumidorId: '1',
      status: PedidoStatusEnum.PREPARACAO,
      itens: []
    }

    const pedido = new Pedido(dto);

    mockListHandle.mockResolvedValue([pedido]);
    mockDto.mockReturnValue(dto)

    const result = await controller.list()

    expect(mockListHandle).toHaveBeenCalledTimes(1)
    expect(mockDto).toHaveBeenCalledTimes(1)

    expect(mockDto).toHaveBeenCalledWith(pedido)
    expect(result).toEqual([dto])

  });

  it("findById method test", async () => {
    const dto = {
      id: 1,
      consumidorId: '1',
      status: PedidoStatusEnum.PREPARACAO,
      itens: []
    }

    const pedido = new Pedido(dto);

    mockFindByIdHandle.mockResolvedValue(pedido);
    mockDto.mockReturnValue(dto)

    const result = await controller.findById(1)

    expect(mockFindByIdHandle).toHaveBeenCalledTimes(1)
    expect(mockDto).toHaveBeenCalledTimes(1)

    expect(mockFindByIdHandle).toHaveBeenCalledWith(1)
    expect(mockDto).toHaveBeenCalledWith(pedido)
    expect(result).toEqual(dto)
  });

  it("startCooking method test", async () => {
    const dto = {
      id: 1,
      consumidorId: '1',
      status: PedidoStatusEnum.PREPARACAO,
      itens: []
    }

    const pedido = new Pedido(dto);

    mockStartCookingHandle.mockResolvedValue(pedido);
    mockDto.mockReturnValue(dto)

    const result = await controller.startCooking(1)

    expect(mockStartCookingHandle).toHaveBeenCalledTimes(1)
    expect(mockDto).toHaveBeenCalledTimes(1)

    expect(mockStartCookingHandle).toHaveBeenCalledWith(1)
    expect(mockDto).toHaveBeenCalledWith(pedido)
    expect(result).toEqual(dto)
  });

  it("finishCooking method test", async () => {
    const dto = {
      id: 1,
      consumidorId: '1',
      status: PedidoStatusEnum.PREPARACAO,
      itens: []
    }

    const pedido = new Pedido(dto);

    mockFinishCookingHandle.mockResolvedValue(pedido);
    mockDto.mockReturnValue(dto)

    const result = await controller.finishCooking(1)

    expect(mockFinishCookingHandle).toHaveBeenCalledTimes(1)
    expect(mockDto).toHaveBeenCalledTimes(1)

    expect(mockFinishCookingHandle).toHaveBeenCalledWith(1)
    expect(mockDto).toHaveBeenCalledWith(pedido)
    expect(result).toEqual(dto)
  });
})
