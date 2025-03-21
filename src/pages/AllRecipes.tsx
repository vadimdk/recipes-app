import { useState } from 'react';
import { useRecipes } from '../hooks/useRecipes';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { RecipeCard } from '../components/RecipeCard';
import { Pagination } from '../components/Pagination';
import { useQuery } from '@tanstack/react-query';

const ITEMS_PER_PAGE = 12;

export function AllRecipes() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // const { data: recipes = [], isLoading } = useRecipes(search);
  const { data: recipes = [], isLoading } = useRecipes();
  console.log('recipes', recipes);
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],})

  const filteredRecipes = category
    ? recipes.filter((recipe) => recipe.strCategory === category)
    : recipes;
    console.log('categories', categories);
    console.log('category', category);
  console.log('filteredRecipes', filteredRecipes);

  const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE);
  const paginatedRecipes = filteredRecipes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  console.log('paginatedRecipes', paginatedRecipes);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <SearchBar onSearch={setSearch} />
        <CategoryFilter
          selectedCategory={category}
          onSelectCategory={setCategory}
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : paginatedRecipes.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedRecipes.map((recipe) => (
              <RecipeCard key={recipe?.idMeal} recipe={recipe} />
            ))}
          </div>
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500">
          No recipes found. Try a different search term or category.
        </div>
      )}
    </div>
  );
}