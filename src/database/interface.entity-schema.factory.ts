import { GenericFindAllDomainResponse } from 'src/helper/dto/generic-domain-find-all-response.dto';
import { IdentifiableEntitySchema } from './identifiable-entity.schema';
import { DeepPartial } from 'typeorm';

export interface IEntitySchemaFactory<TSchema extends IdentifiableEntitySchema, TEntity> {
    findAllToDto(data: TSchema[], dataLength: number, count: number, page: number, take: number): GenericFindAllDomainResponse<TEntity>;
    createFromSchema(entitySchema: TSchema): TEntity;
    create(data: object): DeepPartial<TSchema>;
}
