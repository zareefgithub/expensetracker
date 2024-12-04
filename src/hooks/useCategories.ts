import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CategoriesState {
  categories: string[];
  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
}

export const useCategories = create<CategoriesState>()(
  persist(
    (set) => ({
      categories: ['travel', 'office', 'meals', 'other'],
      addCategory: (category) =>
        set((state) => ({
          categories: [...new Set([...state.categories, category])],
        })),
      deleteCategory: (category) =>
        set((state) => ({
          categories: state.categories.filter((c) => c !== category),
        })),
    }),
    {
      name: 'expense-categories',
    }
  )
);