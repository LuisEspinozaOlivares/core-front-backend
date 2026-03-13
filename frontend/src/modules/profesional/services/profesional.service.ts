import apiClient from '@/src/common/api.client';
import { ApiResponse, PaginatedResponse } from '@/src/common/base.types';
import { ProfesionalEntity } from '../types/profesional.types';
import { ProfesionalDTO } from '../dto/profesional.dto';
import { profesionalMapper } from '../mapper/profesional.mapper';

export const profesionalService = {
  async getAll(params?: any): Promise<PaginatedResponse<ProfesionalDTO>> {
    const { data } = await apiClient.get<PaginatedResponse<ProfesionalEntity>>('/profesional', { params });
    return {
      ...data,
      data: data.data.map(p => profesionalMapper.toDTO(p)),
    };
  },

  async getById(id: number): Promise<ApiResponse<ProfesionalDTO>> {
    // El backend devuelve ProfesionalDto directamente (sin wrapper ApiResponse)
    const { data } = await apiClient.get<ProfesionalEntity>(`/profesional/${id}`);
    return { data: profesionalMapper.toDTO(data) };
  },

  async create(profesional: ProfesionalDTO): Promise<ApiResponse<ProfesionalDTO>> {
    const entity = profesionalMapper.toEntity(profesional);
    const { data } = await apiClient.post<ProfesionalEntity>('/profesional', entity);
    return { data: profesionalMapper.toDTO(data) };
  },

  async update(id: number, profesional: ProfesionalDTO): Promise<ApiResponse<ProfesionalDTO>> {
    const entity = profesionalMapper.toEntity(profesional);
    const { data } = await apiClient.put<ProfesionalEntity>(`/profesional/${id}`, entity);
    return { data: profesionalMapper.toDTO(data) };
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/profesional/${id}`);
  },
};
