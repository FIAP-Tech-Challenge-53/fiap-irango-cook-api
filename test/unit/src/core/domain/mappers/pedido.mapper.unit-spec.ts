import PedidoDto from '@/core/domain/dto/output/pedido.dto'
import Pedido from '@/core/domain/entities/pedido'
import PedidoMapper from '@/core/domain/mappers/pedido.mapper'
import { PedidoStatusEnum } from "@/core/domain/enums/pedido-status.enum"

describe('Testing PedidoMapper Class', () => {
  it('toDto static method should receive Pedido Class and return PedidoDto class', () => {
    const pedido = Pedido.create(1, '1', PedidoStatusEnum.PREPARACAO, [], new Date(1), new Date(1));
    const dto = PedidoMapper.toDto(pedido)
    expect(dto.id).toEqual(1)
    expect(dto.consumidorId).toEqual('1')
    expect(dto.status).toEqual(PedidoStatusEnum.PREPARACAO)
    expect(dto.itens).toEqual([])
    expect(dto.createdAt).toEqual(new Date(1))
    expect(dto.updatedAt).toEqual(new Date(1))
  })

  it('toDomainEntity static method should receive PedidoDto Class and return Pedido class', () => {
    const dto:PedidoDto = {
      id: 1,
      consumidorId: '1',
      status: PedidoStatusEnum.PREPARACAO,
      itens: [],
      createdAt: new Date(1),
      updatedAt: new Date(1)
    }

    const pedido = PedidoMapper.toDomainEntity(dto)

    expect(pedido).toBeInstanceOf(Pedido)
    expect(pedido.status).toEqual(PedidoStatusEnum.PREPARACAO)
    expect(pedido.id).toEqual(1)
    expect(pedido.consumidorId).toEqual('1')
    expect(pedido.itens).toEqual([])
    expect(pedido.createdAt).toEqual(new Date(1))
    expect(pedido.updatedAt).toEqual(new Date(1))
  })
})
