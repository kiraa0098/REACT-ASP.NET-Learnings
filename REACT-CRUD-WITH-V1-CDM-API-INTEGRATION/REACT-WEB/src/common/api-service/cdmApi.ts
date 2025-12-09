import axiosInstance from './axiosInstance';
import type { Record, CreateRecordDto, UpdateRecordDto, PagedResult } from '../models/cdm';



const cdmApi = {
  getRecords: async (pageNumber: number, pageSize: number): Promise<PagedResult<Record>> => {
    const response = await axiosInstance.get<PagedResult<Record>>(`/api/temp-test-records/paged?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    return response.data;
  },

  getRecordById: async (id: number): Promise<Record | undefined> => {
    const response = await axiosInstance.get<Record>(`/api/temp-test-records?Id=${id}`);
    return response.data;
  },

  createRecord: async (payload: CreateRecordDto): Promise<Record> => {
    const response = await axiosInstance.post<Record>('/api/temp-test-records', payload);
    return response.data;
  },

  updateRecord: async (id: number, payload: UpdateRecordDto): Promise<Record> => {
    const response = await axiosInstance.put<Record>('/api/temp-test-records', { ...payload, Id: id });
    return response.data;
  },

  deleteRecord: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/api/temp-test-records/${id}`);
  },
};

export default cdmApi;
