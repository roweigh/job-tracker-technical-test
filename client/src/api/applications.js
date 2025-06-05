
import { get, post, put } from './api-utils';

export const getApplications = async () => get('/applications');
export const getApplication = async (id) => get(`/applications/${id}`);
export const addApplication = async (payload) => post('/applications', payload);
export const updateApplication = async (id, payload) => put(`/applications/${id}`, payload);