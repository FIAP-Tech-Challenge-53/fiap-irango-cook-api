import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import PedidoDto from '@/core/domain/dto/output/pedido.dto'
import Pedido from '@/core/domain/entities/pedido'
import PedidoMapper from '@/core/domain/mappers/pedido.mapper'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'
import { Pedido as Entity } from '@/infra/persistence/typeorm/entities/pedido'
import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'

@Injectable()
export default class PedidoTypeormRepository implements IPedidoRepository {
  constructor (
    @InjectRepository(Entity) private readonly repository: Repository<Entity>
  ) {}

  async create (input: Pedido): Promise<Pedido> {
    let model = PedidoMapper.toDto(input)
    model = await this.repository.save(model)

    return PedidoMapper.toDomainEntity(model as PedidoDto)
  }

  async save (input: Pedido): Promise<Pedido> {
    let model = PedidoMapper.toDto(input)

    model = await this.repository.save(model)

    return PedidoMapper.toDomainEntity(model as PedidoDto)
  }

  async findById (id: number): Promise<Pedido | undefined> {
    const pedido = await this.repository
      .createQueryBuilder('pedido')
      .where('pedido.id = :id', { id })
      .getOne()

    return pedido ? PedidoMapper.toDomainEntity(pedido) : undefined
  }

  async find (): Promise<Pedido[]> {
    const pedidos = await this.repository
      .createQueryBuilder('pedido')
      .where(`pedido.status != '${PedidoStatusEnum.PRONTO}'`)
      .orderBy(`(
        CASE pedido.status
          WHEN '${PedidoStatusEnum.PRONTO}' THEN 1
          WHEN '${PedidoStatusEnum.PREPARACAO}' THEN 2
          WHEN '${PedidoStatusEnum.RECEBIDO}' THEN 3
          
          ELSE 99
        END
      )`, 'ASC')
      .addOrderBy('pedido.createdAt', 'DESC')
      .getMany()

    return pedidos.map(pedido => PedidoMapper.toDomainEntity(pedido))
  }
}
