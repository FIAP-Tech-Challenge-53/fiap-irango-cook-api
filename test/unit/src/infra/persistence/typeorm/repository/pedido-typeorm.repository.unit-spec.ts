import { Repository } from 'typeorm'

import PedidoDto from '@/core/domain/dto/output/pedido.dto'
import Pedido from '@/core/domain/entities/pedido'
import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'
import PedidoMapper from '@/core/domain/mappers/pedido.mapper'
import { Pedido as Entity } from '@/infra/persistence/typeorm/entities/pedido'
import PedidoTypeormRepository from '@/infra/persistence/typeorm/repository/pedido-typeorm.repository'

describe('PedidoTypeormRepository class tests', () => {
  let pedidoTypeormRepository:PedidoTypeormRepository

  let repository:jest.Mocked<Repository<Entity>>

  let queryBuilder:any

  let mockToDto:jest.Mock<any>
  let toDomainEntity:jest.Mock<any>

  beforeEach(() => {
    mockToDto = jest.fn()
    toDomainEntity = jest.fn()

    queryBuilder = {
      leftJoinAndSelect: () => queryBuilder,
      where: () => queryBuilder,
      orderBy: () => queryBuilder,
      addOrderBy: () => queryBuilder,
      getOne: jest.fn(),
      getMany: jest.fn(),
    }

    repository = {
      save: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      find: jest.fn(),
      createQueryBuilder: () => queryBuilder
    } as unknown as jest.Mocked<Repository<Entity>>

    PedidoMapper.toDto = mockToDto
    PedidoMapper.toDomainEntity = toDomainEntity

    pedidoTypeormRepository = new PedidoTypeormRepository(repository)
  })

  it('constructor class test', async () => {
    expect(pedidoTypeormRepository).toBeInstanceOf(PedidoTypeormRepository)
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
    repository.save.mockResolvedValue(entity)

    const result = await pedidoTypeormRepository.create(pedido)
    expect(mockToDto).toHaveBeenCalledTimes(1)
    expect(toDomainEntity).toHaveBeenCalledTimes(1)
    expect(repository.save).toHaveBeenCalledTimes(1)
    expect(mockToDto).toHaveBeenCalledWith(pedido)
    expect(toDomainEntity).toHaveBeenCalledWith(entity)
    expect(repository.save).toHaveBeenCalledWith(dto)
    expect(result).toEqual(pedido)
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
    repository.save.mockResolvedValue(entity)

    const result = await pedidoTypeormRepository.save(pedido)
    expect(mockToDto).toHaveBeenCalledTimes(1)
    expect(toDomainEntity).toHaveBeenCalledTimes(1)
    expect(repository.save).toHaveBeenCalledTimes(1)
    expect(mockToDto).toHaveBeenCalledWith(pedido)
    expect(toDomainEntity).toHaveBeenCalledWith(entity)
    expect(repository.save).toHaveBeenCalledWith(dto)
    expect(result).toEqual(pedido)
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

    queryBuilder.getOne.mockResolvedValue(entity)
    toDomainEntity.mockReturnValue(pedido)

    const result = await pedidoTypeormRepository.findById(1)

    expect(toDomainEntity).toHaveBeenCalledTimes(1)
    expect(queryBuilder.getOne).toHaveBeenCalledTimes(1)
    expect(toDomainEntity).toHaveBeenCalledWith(entity)
    expect(result).toEqual(pedido)
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

    queryBuilder.getOne.mockResolvedValue(null)
    const result = await pedidoTypeormRepository.findById(1)

    expect(toDomainEntity).toHaveBeenCalledTimes(0)
    expect(queryBuilder.getOne).toHaveBeenCalledTimes(1)
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

    queryBuilder.getMany.mockResolvedValue([entity])
    toDomainEntity.mockReturnValue(pedido)

    const result = await pedidoTypeormRepository.find()

    expect(toDomainEntity).toHaveBeenCalledTimes(1)
    expect(queryBuilder.getMany).toHaveBeenCalledTimes(1)
    expect(toDomainEntity).toHaveBeenCalledWith(entity)
    expect(result).toEqual([pedido])
  })
})
