import { PaginationQueryModel } from './pagination-query.model';

export type ReadingQueryModel = PaginationQueryModel & {
  meterId: string;
  from: string;
  to: string;
};
