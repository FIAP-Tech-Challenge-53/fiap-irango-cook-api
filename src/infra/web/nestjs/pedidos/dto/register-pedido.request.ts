import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'
import { ApiProperty } from '@nestjs/swagger'

export default class RegisterPedidoRequest {
  @ApiProperty({
    example: 12345,
    description: 'ID do Pedido',
    type: Number,
    required: true,
  })
  readonly id: number

  @ApiProperty({
    example: 'f1453a0d-4b53-4ff9-8b17-709e089ca805',
    description: 'ID do Consumidor no formato uuid',
    type: String,
    required: false,
  })
  readonly consumidorId?: string

  @ApiProperty({
    example: PedidoStatusEnum.RECEBIDO,
    description: 'Status atual do Pedido',
    required: true,
  })
  readonly status: PedidoStatusEnum

  readonly itens: object[]

  @ApiProperty({
    example: '2024-07-01T00:00:00Z',
    description: 'Data de criação do pedido',
    type: Date,
    required: false,
  })
  readonly createdAt: Date

  @ApiProperty({
    example: '2021407-01T00:00:00Z',
    description: 'Data de atualização do pedido',
    type: Date,
    required: false,
  })
  readonly updatedAt: Date
}
