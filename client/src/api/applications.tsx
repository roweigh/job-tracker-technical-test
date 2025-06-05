import { get, post, put } from './api-utils';
import { PaginationState } from '@tanstack/react-table';

export type Application = {
	id?: string;
	companyName: string;
	position: string;
	status: string;
	dateApplied: string;
};

export type Pagination = {
	page: number;
	size: number;
	totalElements: number;
	totalPages: number;
	first: boolean;
	last: boolean;
};

export const getApplications = async (pagination: Pagination) => {
	return await get(
		`/applications?page=${pagination?.page ?? 1}&size=${pagination?.size ?? 20}`
	);
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
