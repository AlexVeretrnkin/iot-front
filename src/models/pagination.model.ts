export type PaginationModel<T> = {
  data: T[];
  page: number;
  offset: number;
  totalCount: number;
};
