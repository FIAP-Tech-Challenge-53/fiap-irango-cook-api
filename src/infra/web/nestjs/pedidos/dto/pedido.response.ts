import { ApiProperty } from '@nestjs/swagger'

import PedidoDto from '@/core/domain/dto/output/pedido.dto'
import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'

export default class PedidoResponse implements PedidoDto {
  @ApiProperty({ description: 'ID', type: String, example: 1 })
  readonly id: number

  @ApiProperty({
    description: 'ID do Consumidor no formato uuid',
    required: false,
    example: 'f1453a0d-4b53-4ff9-8b17-709e089ca805'
  })
  readonly consumidorId?: string

  @ApiProperty({ description: 'Itens do Pedido', isArray: true })
  readonly itens: object[]

  @ApiProperty({ description: 'Status atual do Pedido', example: PedidoStatusEnum.RECEBIDO })
  readonly status: PedidoStatusEnum

  @ApiProperty({ description: 'Data de criação do Pedido', type: Date, example: new Date() })
  readonly createdAt: Date

  @ApiProperty({ description: 'Data da última atualização do Pedido', type: Date, example: new Date() })
  readonly updatedAt: Date
}
