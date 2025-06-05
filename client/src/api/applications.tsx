import { get, post, put } from './api-utils';

export type Application = {
	id: string;
	companyName: string;
	position: string;
	status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
	dateApplied: string;
};

export const getApplications = async () => {
	get('/applications');
};

export const getApplication = async (id: number) => {
	get(`/applications/${id}`);
};

export const addApplication = async (payload: Application) => {
	post('/applications', payload);
};

export const updateApplication = async (id: number, payload: Application) => {
	put(`/applications/${id}`, payload);
};
