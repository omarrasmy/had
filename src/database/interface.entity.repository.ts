import { NotFoundException } from '@nestjs/common';
import { GenericFindAllDomainResponse } from 'src/helper/dto/generic-domain-find-all-response.dto';
import {
    Brackets,
    DeepPartial,
    DeleteResult,
    FindManyOptions,
    FindOneOptions,
    Repository,
    SelectQueryBuilder,
    UpdateResult,
} from 'typeorm';
import { IdentifiableEntitySchema } from './identifiable-entity.schema';

export interface IEntityRepository<TSchema extends IdentifiableEntitySchema, TEntity> {
    findAll(
        options: FindOneOptions<TSchema>,
        take?: number,
        page?: number,
    ): Promise<GenericFindAllDomainResponse<TEntity>>;

    findOne(options: FindOneOptions<TSchema>): Promise<TEntity>;
    create(entity: object): Promise<TEntity>;
    update(
        id: string,
        entity: DeepPartial<TSchema>,
    ): Promise<TEntity>;

    delete(id: string): Promise<DeleteResult>;
    softDelete(findOption: FindOneOptions<TSchema>): Promise<TSchema>;
}
