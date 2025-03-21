import { useParams } from 'react-router-dom';
import { useRecipeDetails } from '../hooks/useRecipeDetails';
import { useFavorites } from '../hooks/useFavorites';
import { Heart, Youtube } from 'lucide-react';
import clsx from 'clsx';

export function RecipeDetails() {
  const { id = '' } = useParams();
  const { data: recipe, isLoading } = useRecipeDetails(id);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Recipe not found
      </div>
    );
  }

  const favorite = isFavorite(recipe.idMeal);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(recipe.idMeal);
    } else {
      addFavorite(recipe);
    }
  };

  const ingredients = Array.from({ length: 20 }, (_, i) => i + 1)
    .map((i) => ({
      ingredient: recipe[`strIngredient${i}` as keyof typeof recipe],
      measure: recipe[`strMeasure${i}` as keyof typeof recipe],
    }))
    .filter(({ ingredient, measure }) => ingredient && measure);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-full object-cover"
          />
          <button
            onClick={toggleFavorite}
            className="absolute right-4 top-4 rounded-full bg-white p-3 shadow-md transition-colors hover:bg-gray-100"
          >
            <Heart
              className={clsx(
                'h-6 w-6',
                favorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
              )}
            />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">{recipe.strMeal}</h1>
            {recipe.strYoutube && (
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <Youtube className="h-6 w-6" />
                Watch on YouTube
              </a>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
              {recipe.strCategory}
            </span>
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
              {recipe.strArea}
            </span>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {ingredients.map(({ ingredient, measure }, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full text-blue-800 font-medium">
                    {index + 1}
                  </span>
                  <span className="font-medium">{measure}</span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
            <div className="prose max-w-none">
              {recipe.strInstructions.split('\n').map((instruction, index) => (
                <p key={index} className="mb-4">
                  {instruction}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}