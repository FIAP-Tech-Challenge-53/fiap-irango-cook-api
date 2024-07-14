import Pedido from '@/core/domain/entities/pedido'
import { PedidoGateway } from '@/core/operation/gateway/pedido.gateway'
import RegisterPedidoRequest from '@/infra/web/nestjs/pedidos/dto/register-pedido.request'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'
import Register from '@/core/application/usecase/pedido/register.use-case';

describe("Register class tests", () => {

    let usecase:Register

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
      usecase = new Register(mockPedidoGateway);
    })

    it("constructor class test", async () => {
        expect(usecase).toBeInstanceOf(Register);
    });

    it("handle method test", async () => {
        const input = new RegisterPedidoRequest();
        let pedido = Pedido.create(
            input.id,
            input.consumidorId,
            input.status,
            input.itens,
            input.createdAt,
            input.updatedAt,
        );
        mockCreatePedido.mockResolvedValue(pedido);
        let result = await usecase.handle(input);
        expect(mockCreatePedido).toHaveBeenCalledTimes(1);
        expect(mockCreatePedido).toHaveBeenCalledWith(pedido);
        expect(result).toEqual(pedido);
    });
});