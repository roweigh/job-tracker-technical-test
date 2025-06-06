import axios, { AxiosResponse } from 'axios';
import { showMessage } from '@/components/dialog/Alert';

const BACKEND_URL = 'http://localhost:5166/api';
const config = {
  headers: { 'Content-Type': 'application/json' }
};

export async function get<T = any>(url: string): Promise<AxiosResponse<T>> {
  return await axios.get<T>(BACKEND_URL + url, config);
}

export async function post<T = any>(
  url: string,
  data: any
): Promise<AxiosResponse<T>> {
  return await axios.post<T>(BACKEND_URL + url, data, config);
}

export async function put<T = any>(
  url: string,
  data: any
): Promise<AxiosResponse<T>> {
  return await axios.put<T>(BACKEND_URL + url, data, config);
}

export function handle(error: unknown) {
  if (axios.isAxiosError(error)) {
    showMessage(error?.response?.data?.title ?? error?.message, 'error');
  } else {
    showMessage('An error occured', 'error');
  }
}
