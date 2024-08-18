import Confirm from '@/core/application/usecase/pedido/confirm.use-case'
import FindById from '@/core/application/usecase/pedido/findById.use-case'
import FinishCooking from '@/core/application/usecase/pedido/finishCooking.use-case'
import List from '@/core/application/usecase/pedido/list.use-case'
import Register from '@/core/application/usecase/pedido/register.use-case'
import StartCooking from '@/core/application/usecase/pedido/startCooking.use-case'
import PedidoDto from '@/core/domain/dto/output/pedido.dto'
import PedidoMapper from '@/core/domain/mappers/pedido.mapper'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'
import { PedidoGateway } from '@/core/operation/gateway/pedido.gateway'
import IRangoOrderService from '@/infra/persistence/service/irango-order.service'
import RegisterPedidoRequest from '@/infra/web/nestjs/pedidos/dto/register-pedido.request'

export class PedidoController {
  constructor (
   private readonly repository: IPedidoRepository,
   private readonly orderService: IRangoOrderService,
  ) {}

  async register (
    input: RegisterPedidoRequest
  ): Promise<PedidoDto> {
    const useCase = new Register(
      new PedidoGateway(this.repository),
    )

    const pedido = await useCase.handle(input)

    return PedidoMapper.toDto(pedido)
  }

  async list (): Promise<PedidoDto[]> {
    const useCase = new List(new PedidoGateway(this.repository))

    const pedidos = await useCase.handle()
    return pedidos.map((pedido) => PedidoMapper.toDto(pedido))
  }

  async confirm (
    id: number
 ): Promise<PedidoDto> {
   const useCase = new Confirm(
     new PedidoGateway(this.repository),
   )

   const pedido = await useCase.handle(id)
   return PedidoMapper.toDto(pedido)
 }

  async findById (
    id: number,
 ): Promise<PedidoDto> {
    const useCase = new FindById(new PedidoGateway(this.repository))

    const pedido = await useCase.handle(id)

    return PedidoMapper.toDto(pedido)
  }

  async startCooking (
   id: number
): Promise<PedidoDto> {
    const useCase = new StartCooking(new PedidoGateway(this.repository), this.orderService)

    const pedido = await useCase.handle(id)
    return PedidoMapper.toDto(pedido)
  }

  async finishCooking (
   id: number
): Promise<PedidoDto> {
    const useCase = new FinishCooking(new PedidoGateway(this.repository), this.orderService)

    const pedido = await useCase.handle(id)
    return PedidoMapper.toDto(pedido)
  }
}
