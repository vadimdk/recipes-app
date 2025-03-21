import { useState } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { RecipeCard } from '../components/RecipeCard';
import { ChevronDown, ChevronUp } from 'lucide-react';
import clsx from 'clsx';
import { Recipe } from '../api';
import { useGetRecipesById } from '../hooks/useGetRecipesById';

export function FavoriteRecipes() {
  const { favorites } = useFavorites();
  const [expandedInstructions, setExpandedInstructions] = useState<string[]>([]);
  const { data: recipes } = useGetRecipesById(favorites);
  
  const toggleInstructions = (id: string) => {
    setExpandedInstructions((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const allIngredients = recipes?.reduce((acc, recipe) => {
    const ingredients = Array.from({ length: 20 }, (_, i) => i + 1)
      .map((i) => ({
        ingredient: recipe[`strIngredient${i}`],
        measure: recipe[`strMeasure${i}`],
      }))
      .filter(({ ingredient, measure }) => ingredient && measure);

    ingredients.forEach(({ ingredient, measure }) => {
      if (!acc[ingredient as string]) {
        acc[ingredient as string] = [];
      }
      acc[ingredient as string].push(`${measure} (${recipe.strMeal})`);
    });

    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Favorite Recipes</h1>

      {recipes?.length === 0 ? (
        <div className="text-center text-gray-500">
          No favorite recipes yet. Add some recipes to your favorites!
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Recipes</h2>
            <div className="grid gap-6">
              {recipes?.map((recipe: Recipe) => (
                <div key={recipe?.idMeal}>
                  <RecipeCard recipe={recipe} />
                  <button
                    onClick={() => toggleInstructions(recipe?.idMeal)}
                    className="mt-2 flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    {expandedInstructions.includes(recipe?.idMeal) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                    {expandedInstructions.includes(recipe?.idMeal)
                      ? 'Hide Instructions'
                      : 'Show Instructions'}
                  </button>
                  <div
                    className={clsx(
                      'mt-2 overflow-hidden transition-all duration-200',
                      expandedInstructions.includes(recipe?.idMeal)
                        ? 'max-h-[1000px]'
                        : 'max-h-0'
                    )}
                  >
                    <div className="prose max-w-none bg-gray-50 p-4 rounded-lg">
                      {recipe.strInstructions.split('\n').map((instruction, index) => (
                        <p key={index} className="mb-2">
                          {instruction}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Combined Ingredients</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              {Object.entries(allIngredients ?? {}).map(([ingredient, measures]) => (
                <div key={ingredient} className="mb-4">
                  <h3 className="font-medium text-lg text-gray-900">
                    {ingredient}
                  </h3>
                  <ul className="mt-1 space-y-1">
                    {measures.map((measure, index) => (
                      <li key={index} className="text-gray-600">
                        • {measure}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}