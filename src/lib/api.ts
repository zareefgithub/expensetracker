import axios from 'axios';
import { z } from 'zod';
import type { Expense } from '@/types/expense';

const API_URL = 'https://api.expenseai.com/v1';

export const createApiClient = (getToken: () => Promise<string>) => {
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};

export const expenseSchema = z.object({
  id: z.string(),
  amount: z.number(),
  date: z.string().transform(str => new Date(str)),
  vendor: z.string(),
  category: z.string(),
  status: z.enum(['pending', 'processed', 'error']),
});

export const expenseListSchema = z.array(expenseSchema);

export type ExpenseResponse = z.infer<typeof expenseSchema>;

export const createExpenseApi = (getToken: () => Promise<string>) => {
  const api = createApiClient(getToken);

  return {
    async getExpenses(): Promise<Expense[]> {
      const { data } = await api.get('/expenses');
      return expenseListSchema.parse(data).map(expense => ({
        ...expense,
        date: new Date(expense.date),
      }));
    },

    async uploadExpense(file: File): Promise<Expense> {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await api.post('/expenses/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return expenseSchema.parse(data);
    },

    async updateExpense(id: string, updates: Partial<Expense>): Promise<Expense> {
      const { data } = await api.patch(`/expenses/${id}`, updates);
      return expenseSchema.parse(data);
    },

    async deleteExpense(id: string): Promise<void> {
      await api.delete(`/expenses/${id}`);
    },
  };
};