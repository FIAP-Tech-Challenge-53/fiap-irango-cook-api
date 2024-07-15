import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { HydratedDocument } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'

@Schema()
export class Pedido {
  @Prop({
    type: String,
    default: function genUUID () {
      return uuidv4()
    }
  })
  public readonly _id: number

  @Prop()
  public readonly id: number

  @Prop()
  consumidorId?: string

  @Prop()
  status: PedidoStatusEnum

  @Prop()
  itens: object[]

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date
}

export type PedidoDocument = HydratedDocument<Pedido>

export const PedidoSchema = SchemaFactory.createForClass(Pedido)
