import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { IPedidoRepository } from '@/core/domain/repositories/ipedido.repository'
import { IOrderService } from '@/core/domain/services/iorder.service'
import { Pedido, PedidoSchema } from '@/infra/persistence/mongo/entities/pedido'
import PedidoMongoRepository from '@/infra/persistence/mongo/repository/pedido-mongo.repository'
import IRangoOrderService from '@/infra/persistence/service/irango-order.service'
import PedidosController from '@/infra/web/nestjs/pedidos/pedidos.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pedido.name, schema: PedidoSchema }]),
  ],
  providers: [
    { provide: IPedidoRepository, useClass: PedidoMongoRepository },
    { provide: IOrderService, useClass: IRangoOrderService },
  ],
  controllers: [
    PedidosController,
  ],
})
export default class PedidosModule {}
