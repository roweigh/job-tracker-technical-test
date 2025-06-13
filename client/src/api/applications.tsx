import { get, post, put } from './api-utils';
import { SortingState } from '@tanstack/react-table';

export type Application = {
  id?: string;
  companyName: string;
  position: string;
  status: string;
  dateApplied: string;
};

export type Pagination = {
  page: number
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

export const getApplications = async (pagination: Pagination, sorting: SortingState) => {
  const sortBy = sorting[0]?.id ?? undefined;
  const sortDesc = sorting[0]?.desc  ? 'true' : 'false';
  return await get(`/applications?page=${pagination?.page ?? 1}&size=${pagination?.size ?? 20}&sortBy=${sortBy}&sortDesc=${sortDesc}`);
};

export const getApplication = async (id: string) => {
  return await get(`/applications/${id}`);
};

export const addApplication = async (payload: Application) => {
  return await post('/applications', payload);
};

export const updateApplication = async (id: string, payload: Application) => {
  return await put(`/applications/${id}`, payload);
};

export const bulkUpload = async () => {
  const promises = [];
  const statuses = ['Applied', 'Interview', 'Rejected', 'Offer'];
  for (let i = 0; i < 50; i++) {
    const j = Math.floor(Math.random() * 4);
    const date = new Date();
    const payload = {
      companyName: `Company ${date.getTime()}`,
      position: 'Software Developer',
      status: statuses[j],
      dateApplied: date.toISOString()
    };
    promises.push(addApplication(payload));
  }

  await Promise.all(promises);
};
