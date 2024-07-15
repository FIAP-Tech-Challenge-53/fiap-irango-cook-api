import Pedido from '@/core/domain/entities/pedido'
import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'

describe('Pedido class tests', () => {
  it('constructor class test', async () => {
    const param = {
      id: 1,
      consumidorId: '1',
      status: PedidoStatusEnum.PREPARACAO,
      itens: []
    }

    const pedido = new Pedido(param)

    expect(pedido).toBeInstanceOf(Pedido)
  })

  it('create method test', async () => {
    const pedido = Pedido.create(1, '1', PedidoStatusEnum.PREPARACAO, [], new Date(1), new Date(1))
    expect(pedido).toBeInstanceOf(Pedido)
  })

  it('update method test', async () => {
    const pedido = Pedido.create(1, '1', PedidoStatusEnum.PREPARACAO, [], new Date(1), new Date(1))
    pedido.update(PedidoStatusEnum.PRONTO)
    expect(pedido.status).toEqual(PedidoStatusEnum.PRONTO)
  })
})
