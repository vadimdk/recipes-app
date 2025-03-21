import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api';
import clsx from 'clsx';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const allCategories = [{ strCategory: 'All' }, ...categories];
  return (
    <div className="flex flex-wrap gap-2">
      {allCategories.map((category) => (
        <button
          key={category.strCategory}
          onClick={() => onSelectCategory(category.strCategory)}
          className={clsx(
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            selectedCategory === category.strCategory
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          )}
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}