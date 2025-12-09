export interface Record {
  id: number | null;
  name: string;
  description: string | null;
}

export interface CreateRecordDto {
  Name: string;
  Description: string | null;
}

export interface UpdateRecordDto {
  Id: number;
  Name?: string;
  Description?: string | null;
}

export interface PagedResult<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
