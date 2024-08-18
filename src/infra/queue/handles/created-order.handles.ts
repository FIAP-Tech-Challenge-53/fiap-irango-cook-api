import { Environment } from '@/infra/web/nestjs/environment';
import {
  Inject
} from '@nestjs/common'
import { Message } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs';


import { PedidoController } from '@/core/operation/controllers/pedido.controller';
import RegisterPedidoRequest from '@/infra/web/nestjs/pedidos/dto/register-pedido.request';

import IPedidoRepository, {
  IPedidoRepository as IPedidoRepositorySymbol,
} from '@/core/domain/repositories/ipedido.repository'
import IOrderService, {
  IOrderService as IOrderServiceSymbol,
} from '@/core/domain/services/iorder.service'

@Injectable()
export class CreatedOrderHandler {
  constructor(
    @Inject(IPedidoRepositorySymbol) private readonly repository: IPedidoRepository,
    @Inject(IOrderServiceSymbol) private readonly orderService: IOrderService,
  ) { }

  @SqsMessageHandler(/** name: */ Environment.CREATED_ORDER_QUEUE, /** batch: */ false)
  public async handleMessage(message: Message) {
    const obj: any = JSON.parse(message.Body ?? '');
    const input: RegisterPedidoRequest = JSON.parse(obj.Message ?? '');

    const controller = new PedidoController(
      this.repository,
      this.orderService,
    )
    await controller.register(input)
  }

  @SqsConsumerEventHandler(/** name: */ Environment.CREATED_ORDER_QUEUE, /** eventName: */ 'processing_error')
  public onProcessingError(error: Error, message: Message) {
    // report errors here

    console.log(error, message)
  }
}