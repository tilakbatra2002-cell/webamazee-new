import axios, { AxiosError } from 'axios';
import type {
  AuthUser,
  Customer,
  DashboardStats,
  Invoice,
  Pagination,
  Settings,
  ApiFieldError,
} from './types';

/**
 * The browser always talks to its own origin; in development Vite proxies
 * /api to the Express server, and in production the frontend is deployed with
 * a rewrite to VITE_API_URL. Never point this at localhost from the browser.
 */
const baseURL = import.meta.env.VITE_API_URL || '/api';

export const http = axios.create({ baseURL, timeout: 60000 });

const TOKEN_KEY = 'webamazee.invoice.token';

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

http.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/** Normalised error thrown by every API call in this module. */
export class ApiRequestError extends Error {
  status: number;
  fieldErrors: ApiFieldError[];

  constructor(message: string, status: number, fieldErrors: ApiFieldError[] = []) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }

  /** Maps API field errors onto a form-friendly record. */
  toFieldMap(): Record<string, string> {
    const map: Record<string, string> = {};
    for (const fe of this.fieldErrors) if (!map[fe.field]) map[fe.field] = fe.message;
    return map;
  }
}

let onUnauthorized: (() => void) | null = null;
export const setUnauthorizedHandler = (fn: () => void) => {
  onUnauthorized = fn;
};

http.interceptors.response.use(
  (res) => res,
  (error: AxiosError<{ error?: { message?: string; details?: ApiFieldError[] } }>) => {
    const status = error.response?.status ?? 0;
    const payload = error.response?.data?.error;

    if (status === 401) {
      tokenStore.clear();
      onUnauthorized?.();
    }

    const message =
      payload?.message ||
      (status === 0 ? 'Cannot reach the server. Check your connection.' : error.message) ||
      'Something went wrong';

    return Promise.reject(new ApiRequestError(message, status, payload?.details ?? []));
  }
);

/* ------------------------------------------------------------------- auth */

export const authApi = {
  status: async () => (await http.get<{ data: { needsSetup: boolean } }>('/auth/status')).data.data,
  login: async (email: string, password: string) =>
    (await http.post<{ data: { token: string; user: AuthUser } }>('/auth/login', { email, password }))
      .data.data,
  register: async (name: string, email: string, password: string) =>
    (
      await http.post<{ data: { token: string; user: AuthUser } }>('/auth/register', {
        name,
        email,
        password,
      })
    ).data.data,
  me: async () => (await http.get<{ data: { user: AuthUser } }>('/auth/me')).data.data.user,
};

/* --------------------------------------------------------------- invoices */

export interface InvoiceListParams {
  search?: string;
  status?: string;
  currency?: string;
  customerId?: string;
  from?: string;
  to?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export const invoiceApi = {
  list: async (params: InvoiceListParams = {}) =>
    (
      await http.get<{ data: { invoices: Invoice[]; pagination: Pagination } }>('/invoices', {
        params,
      })
    ).data.data,
  get: async (id: string) =>
    (await http.get<{ data: { invoice: Invoice } }>(`/invoices/${id}`)).data.data.invoice,
  nextNumber: async () =>
    (await http.get<{ data: { invoiceNumber: string } }>('/invoices/next-number')).data.data
      .invoiceNumber,
  create: async (payload: unknown) =>
    (await http.post<{ data: { invoice: Invoice } }>('/invoices', payload)).data.data.invoice,
  update: async (id: string, payload: unknown) =>
    (await http.put<{ data: { invoice: Invoice } }>(`/invoices/${id}`, payload)).data.data.invoice,
  setStatus: async (id: string, status: string) =>
    (await http.patch<{ data: { invoice: Invoice } }>(`/invoices/${id}/status`, { status })).data.data
      .invoice,
  duplicate: async (id: string) =>
    (await http.post<{ data: { invoice: Invoice } }>(`/invoices/${id}/duplicate`)).data.data.invoice,
  remove: async (id: string) => (await http.delete(`/invoices/${id}`)).data,

  /** Streams the server-rendered PDF/image and saves it via a blob URL. */
  download: async (id: string, kind: 'pdf' | 'png' | 'jpg', filename: string) => {
    const url = kind === 'pdf' ? `/invoices/${id}/pdf` : `/invoices/${id}/image`;
    const params = kind === 'pdf' ? {} : { format: kind };
    const res = await http.get(url, { params, responseType: 'blob' });

    const href = URL.createObjectURL(res.data as Blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    // Give the browser a tick to start the download before revoking.
    setTimeout(() => URL.revokeObjectURL(href), 4000);
  },
};

/* -------------------------------------------------------------- customers */

export const customerApi = {
  list: async (search = '') =>
    (await http.get<{ data: { customers: Customer[] } }>('/customers', { params: { search } })).data
      .data.customers,
  get: async (id: string) =>
    (await http.get<{ data: { customer: Customer; invoices: Invoice[] } }>(`/customers/${id}`)).data
      .data,
  create: async (payload: Partial<Customer>) =>
    (await http.post<{ data: { customer: Customer } }>('/customers', payload)).data.data.customer,
  update: async (id: string, payload: Partial<Customer>) =>
    (await http.put<{ data: { customer: Customer } }>(`/customers/${id}`, payload)).data.data
      .customer,
  remove: async (id: string, force = false) =>
    (await http.delete(`/customers/${id}`, { params: force ? { force: 'true' } : {} })).data,
};

/* --------------------------------------------------------------- settings */

export const settingsApi = {
  get: async () =>
    (await http.get<{ data: { settings: Settings } }>('/settings')).data.data.settings,
  update: async (payload: Partial<Settings>) =>
    (await http.put<{ data: { settings: Settings } }>('/settings', payload)).data.data.settings,
};

/* -------------------------------------------------------------- dashboard */

export const dashboardApi = {
  stats: async () => (await http.get<{ data: DashboardStats }>('/dashboard/stats')).data.data,
};
