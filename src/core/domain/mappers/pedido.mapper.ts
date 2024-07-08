import PedidoDto from '@/core/domain/dto/output/pedido.dto'
import Pedido from '@/core/domain/entities/pedido'

export default class PedidoMapper {
  static toDto (pedido: Pedido): PedidoDto {
    return {
      id: pedido.id,
      consumidorId: pedido.consumidorId,
      status: pedido.status,
      itens: pedido.itens,
      createdAt: pedido.createdAt,
      updatedAt: pedido.updatedAt
    }
  }

  static toDomainEntity (input: PedidoDto): Pedido {
    return new Pedido({
      id: input.id,
      consumidorId: input.consumidorId,
      status: input.status,
      itens: input.itens,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt
    })
  }
}
