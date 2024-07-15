import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Model } from 'mongoose'

import PedidoDto from '@/core/domain/dto/output/pedido.dto'
import Pedido from '@/core/domain/entities/pedido'
import PedidoMapper from '@/core/domain/mappers/pedido.mapper'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'

@Injectable()
export default class PedidoMongoRepository implements IPedidoRepository {
  constructor (
    @InjectModel(Pedido.name) private pedidoModel: Model<Pedido>
  ) {}

  async create (input: Pedido): Promise<Pedido> {
    const findModel = await this.pedidoModel.findOne({ id: input.id }).exec()
    if (findModel) {
      return findModel
    }

    let model = PedidoMapper.toDto(input)
    model = await this.pedidoModel.create(model)

    return PedidoMapper.toDomainEntity(model as PedidoDto)
  }

  async save (input: Pedido): Promise<Pedido> {
    const model = PedidoMapper.toDto(input)

    // find by pedido id
    const findModel = await this.pedidoModel.findOne({ id: model.id }).exec()
    if (!findModel) {
      throw new Error('Pedido não encontrado')
    }

    await this.pedidoModel.updateOne({ id: model.id }, model).exec()

    return PedidoMapper.toDomainEntity(model as PedidoDto)
  }

  async findById (id: number): Promise<Pedido | undefined> {
    const pedido = await this.pedidoModel.findOne({ id }).exec()

    return pedido ? PedidoMapper.toDomainEntity(pedido) : undefined
  }

  async find (): Promise<Pedido[]> {
    const pedidos = await this.pedidoModel.find({
      status: { $in: ['RECEBIDO', 'PREPARACAO'] }
    }).sort({ status: 1, createdAt: 1 }).exec()

    return pedidos.map(PedidoMapper.toDomainEntity)
  }
}
