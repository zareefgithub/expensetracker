import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CATEGORY_STYLES } from '@/lib/constants';
import { useCategories } from '@/hooks/useCategories';

export function CategoryManager() {
  const [newCategory, setNewCategory] = useState('');
  const { categories, addCategory, deleteCategory } = useCategories();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim()) {
      addCategory(newCategory.trim().toLowerCase());
      setNewCategory('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Manage Categories
      </h3>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <Button type="submit" disabled={!newCategory.trim()}>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </form>

      <div className="space-y-2">
        {categories.map((category) => {
          const style = CATEGORY_STYLES[category as keyof typeof CATEGORY_STYLES] || CATEGORY_STYLES.other;
          
          return (
            <div
              key={category}
              className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50"
            >
              <span
                className="px-3 py-1 rounded-full text-sm font-medium capitalize"
                style={{
                  backgroundColor: style.bg,
                  color: style.text,
                }}
              >
                {category}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteCategory(category)}
                className="text-red-600 hover:bg-red-50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}