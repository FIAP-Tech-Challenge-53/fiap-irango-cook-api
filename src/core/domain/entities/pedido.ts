import { PedidoStatusEnum } from "@/core/domain/enums/pedido-status.enum"

export default class Pedido {
  readonly id: number
  consumidorId?: string
  status: PedidoStatusEnum
  itens: object[]
  createdAt: Date
  updatedAt: Date

  public constructor (params?: Partial<Pedido>) {
    Object.assign(this, params)
  }

  static create (
    id: number,
    consumidorId: string | undefined,
    status: PedidoStatusEnum,
    itens: object[],
    createdAt: Date,
    updatedAt: Date,
  ): Pedido {
    const pagamento = new Pedido({
      id,
      consumidorId,
      status,
      itens,
      createdAt,
      updatedAt
    })

    return pagamento
  }

  update (status: PedidoStatusEnum): void {
    this.status = status
  }
}
