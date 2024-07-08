import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'
import { Column, Entity, Index, PrimaryColumn } from 'typeorm'

@Entity('Pedido')
export class Pedido {
  @PrimaryColumn()
  public readonly id: number

  @Column({ name: 'consumidor_id', length: 36, nullable: true })
  @Index()
  consumidorId?: string

  @Column({ type: 'varchar', length: 20 })
  status: PedidoStatusEnum

  @Column({ type: 'json' })
  itens: object[]

  @Column({ name: 'created_at' })
  createdAt: Date

  @Column({ name: 'updated_at' })
  updatedAt: Date
}
