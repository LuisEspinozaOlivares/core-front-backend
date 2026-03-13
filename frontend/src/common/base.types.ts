export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

// Coincide con PaginationResponseDto del backend: { data, page, total, lastPage }
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  total: number;
  lastPage: number;
}

export type ApiError = {
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
};
