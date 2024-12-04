import React, { useState } from 'react';
import { useExpenses } from '@/hooks/useExpenses';
import { ExpenseChart } from '@/components/analytics/ExpenseChart';
import { CategoryManager } from '@/components/categories/CategoryManager';
import { Button } from '@/components/ui/Button';
import { BarChart, PieChart, Loader2 } from 'lucide-react';

export function AnalyticsPage() {
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');
  const { expenses, isLoading, isError } = useExpenses();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-600">
        Failed to load expense data
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <div className="flex gap-2">
          <Button
            variant={chartType === 'bar' ? 'primary' : 'outline'}
            onClick={() => setChartType('bar')}
          >
            <BarChart className="w-4 h-4 mr-2" />
            Bar
          </Button>
          <Button
            variant={chartType === 'pie' ? 'primary' : 'outline'}
            onClick={() => setChartType('pie')}
          >
            <PieChart className="w-4 h-4 mr-2" />
            Pie
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <ExpenseChart expenses={expenses} type={chartType} />
        </div>
        <div className="lg:col-span-1">
          <CategoryManager />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-600 mb-1">
              Total Expenses
            </h3>
            <p className="text-2xl font-bold text-blue-900">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(
                expenses.reduce((sum, exp) => sum + exp.amount, 0)
              )}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-600 mb-1">
              Total Receipts
            </h3>
            <p className="text-2xl font-bold text-green-900">
              {expenses.length}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-purple-600 mb-1">
              Categories
            </h3>
            <p className="text-2xl font-bold text-purple-900">
              {new Set(expenses.map(e => e.category)).size}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}