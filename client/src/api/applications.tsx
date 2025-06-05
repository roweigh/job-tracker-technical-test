import { get, post, put } from './api-utils';

export type Application = {
	id?: string;
	companyName: string;
	position: string;
	status: string;
	dateApplied: string;
};

export const getApplications = async () => {
	return await get('/applications');
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
