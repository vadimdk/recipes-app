import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Recipe } from '../api';
import { useFavorites } from '../hooks/useFavorites';
import clsx from 'clsx';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(recipe?.idMeal);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (favorite) {
      removeFavorite(recipe?.idMeal);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <Link
      to={`/recipe/${recipe?.idMeal}`}
      className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:-translate-y-1"
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={recipe?.strMealThumb}
          alt={recipe?.strMeal}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <button
        onClick={toggleFavorite}
        className="absolute right-2 top-2 rounded-full bg-white p-2 shadow-md transition-colors hover:bg-gray-100"
      >
        <Heart
          className={clsx(
            'h-5 w-5',
            favorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
          )}
        />
      </button>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{recipe?.strMeal}</h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
            {recipe?.strCategory}
          </span>
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
            {recipe?.strArea}
          </span>
        </div>
      </div>
    </Link>
  );
}