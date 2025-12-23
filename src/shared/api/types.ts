export type ApiSuccess<T> = {
  success: true;
  message: string;
  data: T;
};

export type ApiError = {
  success: false;
  message: string;
  data: null;
};

export type APIResponse<T> = ApiSuccess<T> | ApiError;
export const isOk = <T>(
  r: APIResponse<T>
): r is ApiSuccess<T> => r.success === true;


export type Page<T> = {
  content: T[];

  totalElements: number;
  totalPages: number;

  size: number;          // page size
  number: number;        // page index (0-based)
  numberOfElements: number;

  first: boolean;
  last: boolean;
  empty: boolean;
};
