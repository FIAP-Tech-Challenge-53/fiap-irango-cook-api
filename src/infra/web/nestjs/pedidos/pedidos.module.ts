import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { IPedidoRepository } from '@/core/domain/repositories/ipedido.repository'
import { IOrderService } from '@/core/domain/services/iorder.service'
import IRangoOrderService from '@/infra/persistence/service/irango-order.service'
import { Pedido } from '@/infra/persistence/typeorm/entities/pedido'
import PedidoTypeormRepository from '@/infra/persistence/typeorm/repository/pedido-typeorm.repository'
import PedidosController from '@/infra/web/nestjs/pedidos/pedidos.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pedido,
    ]),
  ],
  providers: [
    { provide: IPedidoRepository, useClass: PedidoTypeormRepository },
    { provide: IOrderService, useClass: IRangoOrderService },
  ],
  controllers: [
    PedidosController,
  ],
})
export default class PedidosModule {}
