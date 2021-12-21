import { MeterEnum } from '../../enums/meter.enum';
import { PaginationQueryModel } from './pagination-query.model';

export type MeterQueryModel = PaginationQueryModel & {
  type?: MeterEnum;
};
