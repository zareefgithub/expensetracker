import React from 'react';
import { FileUpload } from '@/components/FileUpload';
import { ExpenseList } from '@/components/expenses/ExpenseList';
import { useExpenses } from '@/hooks/useExpenses';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HomePage() {
  const { uploadExpense, isUploading } = useExpenses();

  const handleFileSelect = async (files: File[]) => {
    try {
      await Promise.all(files.map(file => uploadExpense(file)));
    } catch (error) {
      console.error('Failed to upload files:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Upload Expenses
        </h2>
        <div className="relative">
          <FileUpload
            onFileSelect={handleFileSelect}
            className={cn(
              'max-w-2xl',
              isUploading && 'opacity-50 pointer-events-none'
            )}
          />
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Recent Expenses
        </h2>
        <ExpenseList />
      </section>
    </div>
  );
}