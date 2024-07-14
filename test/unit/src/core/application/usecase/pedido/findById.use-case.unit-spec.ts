import Pedido from '@/core/domain/entities/pedido'
import BusinessException from '@/core/domain/errors/business-exception'
import { PedidoGateway } from '@/core/operation/gateway/pedido.gateway'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'
import FindById from '@/core/application/usecase/pedido/findById.use-case';

describe("FindById class tests", () => {

    let usecase:FindById

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
      usecase = new FindById(mockPedidoGateway);
    })

    it("constructor class test", async () => {
        expect(usecase).toBeInstanceOf(FindById);
    });

    it("handle method test with pedido not found", async () => {
        mockFindByIdPedido.mockResolvedValue(null);
        await expect(usecase.handle(1)).rejects.toThrow(new BusinessException('Pedido não encontrado'))
    });

    it("handle method test with pedido found", async () => {
        const pedido = new Pedido();
        mockFindByIdPedido.mockResolvedValue(pedido);
        let result = await usecase.handle(1);
        expect(mockFindByIdPedido).toHaveBeenCalledTimes(1);
        expect(mockFindByIdPedido).toHaveBeenCalledWith(1);
        expect(result).toEqual(pedido);
    });
});