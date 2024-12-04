import React from 'react';
import { ExpenseCard } from './ExpenseCard';
import { useExpenses } from '@/hooks/useExpenses';
import { AlertCircle, Loader2 } from 'lucide-react';

export function ExpenseList() {
  const { 
    expenses, 
    isLoading, 
    isError,
    deleteExpense,
    isDeleting
  } = useExpenses();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64 text-red-600">
        <AlertCircle className="w-6 h-6 mr-2" />
        <p>Failed to load expenses</p>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No expenses found. Upload some receipts to get started!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {expenses.map((expense) => (
        <ExpenseCard 
          key={expense.id} 
          expense={expense}
          onDelete={() => deleteExpense(expense.id)}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
}