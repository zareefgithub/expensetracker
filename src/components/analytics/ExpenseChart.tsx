import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import type { Expense } from '@/types/expense';
import { CATEGORY_STYLES } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ExpenseChartProps {
  expenses: Expense[];
  type: 'bar' | 'pie';
}

export function ExpenseChart({ expenses, type }: ExpenseChartProps) {
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const categories = Object.keys(categoryTotals);
  const amounts = Object.values(categoryTotals);
  const colors = categories.map(
    (category) =>
      CATEGORY_STYLES[category as keyof typeof CATEGORY_STYLES]?.bg ||
      CATEGORY_STYLES.other.bg
  );

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Total Expenses',
        data: amounts,
        backgroundColor: colors,
        borderColor: colors.map((color) => color.replace('0.1', '1')),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Expenses by Category',
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return ` ${formatCurrency(value)}`;
          },
        },
      },
    },
    ...(type === 'bar' && {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value: number) => formatCurrency(value),
          },
        },
      },
    }),
  };

  return type === 'bar' ? (
    <Bar data={data} options={options} />
  ) : (
    <Pie data={data} options={options} />
  );
}