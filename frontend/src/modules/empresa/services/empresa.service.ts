import apiClient from '@/src/common/api.client';
import { ApiResponse, PaginatedResponse } from '@/src/common/base.types';
import { EmpresaEntity } from '../types/empresa.types';
import { EmpresaDTO } from '../dto/empresa.dto';
import { empresaMapper } from '../mapper/empresa.mapper';

export const empresaService = {
  async getAll(params?: any): Promise<PaginatedResponse<EmpresaDTO>> {
    const { data } = await apiClient.get<PaginatedResponse<EmpresaEntity>>('/empresa', { params });
    return {
      ...data,
      data: data.data.map(e => empresaMapper.toDTO(e)),
    };
  },

  async getById(id: number): Promise<ApiResponse<EmpresaDTO>> {
    // El backend devuelve EmpresaDto directamente (sin wrapper ApiResponse)
    const { data } = await apiClient.get<EmpresaEntity>(`/empresa/${id}`);
    return { data: empresaMapper.toDTO(data) };
  },

  async create(empresa: EmpresaDTO): Promise<ApiResponse<EmpresaDTO>> {
    const entity = empresaMapper.toEntity(empresa);
    const { data } = await apiClient.post<EmpresaEntity>('/empresa', entity);
    return { data: empresaMapper.toDTO(data) };
  },

  async update(id: number, empresa: EmpresaDTO): Promise<ApiResponse<EmpresaDTO>> {
    const entity = empresaMapper.toEntity(empresa);
    const { data } = await apiClient.put<EmpresaEntity>(`/empresa/${id}`, entity);
    return { data: empresaMapper.toDTO(data) };
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/empresa/${id}`);
  },
};
