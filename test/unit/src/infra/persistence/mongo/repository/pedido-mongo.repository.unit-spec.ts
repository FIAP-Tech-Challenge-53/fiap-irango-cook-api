import { Model } from 'mongoose'

import PedidoDto from '@/core/domain/dto/output/pedido.dto'
import Pedido from '@/core/domain/entities/pedido'
import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'
import PedidoMapper from '@/core/domain/mappers/pedido.mapper'
import { Pedido as Entity } from '@/infra/persistence/mongo/entities/pedido'
import PedidoMongoRepository from '@/infra/persistence/mongo/repository/pedido-mongo.repository'

describe('PedidoMongoRepository class tests', () => {
  let pedidoMongoRepository: PedidoMongoRepository

  let model:jest.Mocked<Model<Pedido>>

  let mockToDto:jest.Mock<any>
  let toDomainEntity:jest.Mock<any>

  beforeEach(() => {
    mockToDto = jest.fn()
    toDomainEntity = jest.fn()

    model = {
      create: jest.fn(),
      findOne: jest.fn().mockReturnValue({
        exec: jest.fn()
      }),
      updateOne: jest.fn(),
      find: jest.fn().mockReturnValue(() => ({
        sort: jest.fn().mockReturnValue(() => ({
          exec: jest.fn()
        }))
      }))
    } as any

    PedidoMapper.toDto = mockToDto
    PedidoMapper.toDomainEntity = toDomainEntity

    pedidoMongoRepository = new PedidoMongoRepository(model)
  })

  it('constructor class test', async () => {
    expect(pedidoMongoRepository).toBeInstanceOf(PedidoMongoRepository)
  })

  it('create method test', async () => {
    const dto:PedidoDto = {
      id: 1,
      consumidorId: '1',
      itens: [],
      status: PedidoStatusEnum.PREPARACAO,
      createdAt: new Date(1),
      updatedAt: new Date(1)
    }

    const pedido = new Pedido(dto)

    const entity = new Entity()
    entity.consumidorId = dto.consumidorId
    entity.itens = dto.itens
    entity.status = dto.status
    entity.createdAt = dto.createdAt
    entity.updatedAt = dto.updatedAt

    mockToDto.mockReturnValue(dto)
    toDomainEntity.mockReturnValue(pedido)

    model.findOne.mockReturnValue({
      exec: jest.fn().mockReturnValue(undefined)
    } as any)
    model.create.mockResolvedValue(entity as any)

    const result = await pedidoMongoRepository.create(pedido)
    expect(model.create).toHaveBeenCalledWith(dto)
    expect(result).toMatchObject(pedido)
  })

  it('save method test', async () => {
    const dto:PedidoDto = {
      id: 1,
      consumidorId: '1',
      itens: [],
      status: PedidoStatusEnum.PREPARACAO,
      createdAt: new Date(1),
      updatedAt: new Date(1)
    }

    const pedido = new Pedido(dto)

    const entity = new Entity()
    entity.consumidorId = dto.consumidorId
    entity.itens = dto.itens
    entity.status = dto.status
    entity.createdAt = dto.createdAt
    entity.updatedAt = dto.updatedAt

    mockToDto.mockReturnValue(dto)
    toDomainEntity.mockReturnValue(pedido)

    model.findOne.mockReturnValue({
      exec: jest.fn().mockReturnValue(entity)
    } as any)
    model.updateOne.mockReturnValue({
      exec: jest.fn().mockReturnValue(entity)
    } as any)

    const result = await pedidoMongoRepository.save(pedido)
    expect(model.updateOne).toHaveBeenCalled()
    expect(result).toMatchObject(pedido)
  })

  it('test findById when pedido is found', async () => {
    const dto:PedidoDto = {
      id: 1,
      consumidorId: '1',
      itens: [],
      status: PedidoStatusEnum.PREPARACAO,
      createdAt: new Date(1),
      updatedAt: new Date(1)
    }

    const pedido = new Pedido(dto)

    const entity = new Entity()
    entity.consumidorId = dto.consumidorId
    entity.itens = dto.itens
    entity.status = dto.status
    entity.createdAt = dto.createdAt
    entity.updatedAt = dto.updatedAt

    toDomainEntity.mockReturnValue(pedido)
    model.findOne.mockReturnValue({
      exec: jest.fn().mockReturnValue(entity)
    } as any)

    const result = await pedidoMongoRepository.findById(1)

    expect(result).toMatchObject(pedido)
  })

  it('test findById when pedido is not found', async () => {
    const dto:PedidoDto = {
      id: 1,
      consumidorId: '1',
      itens: [],
      status: PedidoStatusEnum.PREPARACAO,
      createdAt: new Date(1),
      updatedAt: new Date(1)
    }

    const entity = new Entity()
    entity.consumidorId = dto.consumidorId
    entity.itens = dto.itens
    entity.status = dto.status
    entity.createdAt = dto.createdAt
    entity.updatedAt = dto.updatedAt

    const result = await pedidoMongoRepository.findById(1)

    expect(toDomainEntity).toHaveBeenCalledTimes(0)
    expect(result).toEqual(undefined)
  })

  it('test find method', async () => {
    const dto:PedidoDto = {
      id: 1,
      consumidorId: '1',
      itens: [],
      status: PedidoStatusEnum.PREPARACAO,
      createdAt: new Date(1),
      updatedAt: new Date(1)
    }

    const pedido = new Pedido(dto)

    const entity = new Entity()
    entity.consumidorId = dto.consumidorId
    entity.itens = dto.itens
    entity.status = dto.status
    entity.createdAt = dto.createdAt
    entity.updatedAt = dto.updatedAt

    toDomainEntity.mockReturnValue(pedido)
    model.find.mockReturnValue({
      sort: jest.fn().mockReturnValue({ exec: jest.fn().mockReturnValue([entity]) })
    } as any)

    const result = await pedidoMongoRepository.find()

    expect(result).toMatchObject([pedido])
  })
})
