import Pedido from '@/core/domain/entities/pedido'
import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'
import BusinessException from '@/core/domain/errors/business-exception'
import { PedidoGateway } from '@/core/operation/gateway/pedido.gateway'
import IRangoOrderService from '@/infra/persistence/service/irango-order.service'

export default class StartCooking {
  constructor (
    private readonly gateway: PedidoGateway,
    private readonly orderService: IRangoOrderService,
  ) {}

  async handle (id: number): Promise<Pedido> {
    console.log(`Starting cooking Order with ID ${id}`)

    const pedido = await this.gateway.findById(id)

    if (!pedido) {
      throw new BusinessException('Pedido não encontrado')
    }

    if (![PedidoStatusEnum.RECEBIDO, PedidoStatusEnum.PREPARACAO].includes(pedido.status)) {
      throw new BusinessException('Pedido não está com status RECEBIDO')
    }

    pedido.update(PedidoStatusEnum.PREPARACAO)

    await this.gateway.save(pedido)

    await this.orderService.startCooking(pedido.id)

    return pedido
  }
}
