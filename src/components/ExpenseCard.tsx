import React from 'react';
import { formatCurrency, formatDate } from '@/lib/utils';

interface ExpenseCardProps {
  expense: {
    id: string;
    amount: number;
    date: Date;
    vendor: string;
    category: string;
    status: 'pending' | 'processed' | 'error';
  };
}

export function ExpenseCard({ expense }: ExpenseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{expense.vendor}</h3>
          <p className="text-sm text-gray-500">{formatDate(expense.date)}</p>
        </div>
        <span className="text-lg font-medium text-gray-900">
          {formatCurrency(expense.amount)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
          style={{
            backgroundColor: expense.category === 'travel' ? 'rgb(219 234 254)' :
              expense.category === 'office' ? 'rgb(220 252 231)' :
              expense.category === 'meals' ? 'rgb(254 242 242)' : 'rgb(243 244 246)',
            color: expense.category === 'travel' ? 'rgb(29 78 216)' :
              expense.category === 'office' ? 'rgb(21 128 61)' :
              expense.category === 'meals' ? 'rgb(185 28 28)' : 'rgb(55 65 81)',
          }}
        >
          {expense.category}
        </span>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
          ${expense.status === 'processed' ? 'bg-green-100 text-green-800' :
            expense.status === 'error' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'}`}
        >
          {expense.status}
        </span>
      </div>
    </div>
  );
}