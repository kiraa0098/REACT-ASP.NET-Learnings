// C:\Users\alwynn\Desktop\Todo-App\REACT-CRUD-WITH-V1-CDM-API-INTEGRATION\REACT-WEB\src\common\api-service\cdmApi.ts

import axiosInstance from './axiosInstance';
import type { Record, CreateRecordDto, UpdateRecordDto, PagedResult } from '../models/cdm'; // Added PagedResult

// --- Mock Data Store (in-memory) ---
let mockRecords: Record[] = [
  {
    Id: 1, // Changed to number
    Name: 'Initial Record (from Mock)', // Changed to Name
    Description: 'This is a mock initial record, adapted to TempTestRecordModel.',
  },
  {
    Id: 2, // Changed to number
    Name: 'Another Mock Record', // Changed to Name
    Description: 'A second mock record for testing, adapted to TempTestRecordModel.',
  },
];

const simulateDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

// --- API Functions (Mocked) ---

const cdmApi = {
  getRecords: async (): Promise<PagedResult<Record>> => { // Now returns PagedResult
    // In a real scenario:
    // const response = await axiosInstance.get<PagedResult<Record>>('/api/temp-test-records/paged');
    // return response.data;
    await simulateDelay(500);
    const pageNumber = 1; // Simplified for mock
    const pageSize = 10;  // Simplified for mock
    return {
      Items: [...mockRecords],
      PageNumber: pageNumber,
      PageSize: pageSize,
      TotalCount: mockRecords.length,
      TotalPages: Math.ceil(mockRecords.length / pageSize),
      HasPreviousPage: pageNumber > 1,
      HasNextPage: (pageNumber * pageSize) < mockRecords.length,
    };
  },

  getRecordById: async (id: number): Promise<Record | undefined> => { // ID is now number
    // In a real scenario:
    // const response = await axiosInstance.get<Record>(`/api/temp-test-records?id=${id}`); // Backend uses query param
    // return response.data;
    await simulateDelay(500);
    return mockRecords.find(record => record.Id === id);
  },

  createRecord: async (payload: CreateRecordDto): Promise<Record> => {
    // In a real scenario:
    // const response = await axiosInstance.post<Record>('/api/temp-test-records', payload);
    // return response.data;
    await simulateDelay(500);
    const newRecord: Record = {
      Id: mockRecords.length > 0 ? Math.max(...mockRecords.map(r => r.Id || 0)) + 1 : 1, // Simple auto-increment ID
      Name: payload.Name,
      Description: payload.Description,
    };
    mockRecords.push(newRecord);
    return newRecord;
  },

  updateRecord: async (id: number, payload: UpdateRecordDto): Promise<Record> => { // ID is now number
    // In a real scenario:
    // const response = await axiosInstance.put<Record>('/api/temp-test-records', { ...payload, Id: id }); // Backend expects Id in body
    // return response.data;
    await simulateDelay(500);
    const index = mockRecords.findIndex(record => record.Id === id);
    if (index === -1) throw new Error('Record not found');

    const existingRecord = mockRecords[index];
    const updatedRecord: Record = {
      ...existingRecord,
      ...payload, // Apply partial updates
      Id: id, // Ensure ID is correct
    };
    mockRecords[index] = updatedRecord;
    return updatedRecord;
  },

  deleteRecord: async (id: number): Promise<void> => { // ID is now number
    // In a real scenario:
    // await axiosInstance.delete(`/api/temp-test-records/${id}`);
    await simulateDelay(500);
    mockRecords = mockRecords.filter(record => record.Id !== id);
  },
};

export default cdmApi;
