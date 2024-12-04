import React from 'react';
import { Trash2 } from 'lucide-react';
import { formatCurrency, formatDate, cn } from '@/lib/utils';
import { CATEGORY_STYLES, STATUS_STYLES } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import type { Expense } from '@/types/expense';

interface ExpenseCardProps {
  expense: Expense;
  onDelete: () => void;
  isDeleting: boolean;
}

export function ExpenseCard({ expense, onDelete, isDeleting }: ExpenseCardProps) {
  const categoryStyle = CATEGORY_STYLES[expense.category as keyof typeof CATEGORY_STYLES] || CATEGORY_STYLES.other;
  const statusStyle = STATUS_STYLES[expense.status];

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
      <div className="flex justify-between items-center mb-4">
        <span 
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
          style={{
            backgroundColor: categoryStyle.bg,
            color: categoryStyle.text,
          }}
        >
          {expense.category}
        </span>
        <span className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
          statusStyle.bg,
          statusStyle.text
        )}>
          {expense.status}
        </span>
      </div>
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={onDelete}
          disabled={isDeleting}
          className="text-red-600 hover:bg-red-50 hover:border-red-200"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Delete
        </Button>
      </div>
    </div>
  );
}