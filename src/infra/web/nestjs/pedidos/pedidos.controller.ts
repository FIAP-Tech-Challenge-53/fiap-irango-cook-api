import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post
} from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'

import IPedidoRepository, {
  IPedidoRepository as IPedidoRepositorySymbol,
} from '@/core/domain/repositories/ipedido.repository'
import IOrderService, {
  IOrderService as IOrderServiceSymbol,
} from '@/core/domain/services/iorder.service'
import { PedidoController } from '@/core/operation/controllers/pedido.controller'
import PedidoResponse from '@/infra/web/nestjs/pedidos/dto/pedido.response'
import RegisterPedidoRequest from '@/infra/web/nestjs/pedidos/dto/register-pedido.request'
import RegisterPedidoResponse from '@/infra/web/nestjs/pedidos/dto/register-pedido.response'

@Controller('v1/pedidos')
@ApiTags('v1/pedidos')
export default class PedidosController {
  constructor (
    @Inject(IPedidoRepositorySymbol) private readonly repository: IPedidoRepository,
    @Inject(IOrderServiceSymbol) private readonly orderService: IOrderService,
  ) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registra um novo pedido e o associa a um novo Pagamento' })
  @ApiBody({ type: RegisterPedidoRequest })
  @ApiCreatedResponse({ description: 'Registro criado', type: RegisterPedidoResponse })
  registerPedido (
    @Body() input: RegisterPedidoRequest
  ): Promise<RegisterPedidoResponse> {
    const controller = new PedidoController(
      this.repository,
      this.orderService,
    )

    return controller.register(input)
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os Pedidos' })
  @ApiOkResponse({ description: 'Todos os Pedidos', type: [PedidoResponse], isArray: true })
  list (): Promise<PedidoResponse[]> {
    const controller = new PedidoController(
      this.repository,
      this.orderService,
    )

    return controller.list()
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Encontrar um Pedido por ID' })
  @ApiParam({ name: 'id', required: true, example: 12345 })
  @ApiOkResponse({ description: 'O registro encontrado', type: PedidoResponse })
  findById (
    @Param('id') id: number,
  ): Promise<PedidoResponse> {
    const controller = new PedidoController(
      this.repository,
      this.orderService,
    )

    return controller.findById(id)
  }

  @Post('/:id/start')
  @ApiOperation({ summary: 'Receber e processar o evento de início de preparo de um Pedido a partir do serviço irango-cook' })
  @ApiParam({ name: 'id', required: true, example: 12345 })
  @ApiOkResponse({ description: 'O registro atualizado', type: PedidoResponse })
  startCooking (
    @Param('id') id: number,
  ): Promise<PedidoResponse> {
    const controller = new PedidoController(
      this.repository,
      this.orderService,
    )

    return controller.startCooking(id)
  }

  @Post('/:id/finish')
  @ApiOperation({ summary: 'Receber e processar o evento de finalização de preparo de um Pedido a partir do serviço irango-cook' })
  @ApiParam({ name: 'id', required: true, example: 12345 })
  @ApiOkResponse({ description: 'O registro atualizado', type: PedidoResponse })
  finishCooking (
    @Param('id') id: number,
  ): Promise<PedidoResponse> {
    const controller = new PedidoController(
      this.repository,
      this.orderService,
    )

    return controller.finishCooking(id)
  }
}
