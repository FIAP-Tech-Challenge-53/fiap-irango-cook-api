import Pedido from '@/core/domain/entities/pedido'
import { PedidoGateway } from '@/core/operation/gateway/pedido.gateway'
import RegisterPedidoRequest from '@/infra/web/nestjs/pedidos/dto/register-pedido.request'

export default class Register {
  constructor (
    private readonly gateway: PedidoGateway,
  ) {}

  async handle (input: RegisterPedidoRequest): Promise<Pedido> {
    console.log(`Register new Order with ID ${input.id}`)

    let pedido = Pedido.create(
      input.id,
      input.consumidorId,
      input.status,
      input.itens,
      input.createdAt,
      input.updatedAt,
    )

    pedido = await this.gateway.create(pedido)

    return pedido
  }
}
