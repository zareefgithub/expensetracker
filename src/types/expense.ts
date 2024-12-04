export interface Expense {
  id: string;
  amount: number;
  date: Date;
  vendor: string;
  category: string;
  status: 'pending' | 'processed' | 'error';
}

export type ExpenseCategory = 'travel' | 'office' | 'meals' | 'other';