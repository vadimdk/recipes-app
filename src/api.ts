import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
});

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
  strYoutube?: string;
  strInstructions: string;
  [key: string]: string | undefined;
}

export interface Category {
  strCategory: string;
}

export interface FavoritesResponse {
  favorites: Recipe[];
}

// export const fetchRecipes = async (search: string): Promise<Recipe[]> => {
  // const response = await api.get(`/search.php?s=${search}`);
//   return response.data.meals || [];
// };

const categories = [
  'Beef',
  'Chicken',
  'Dessert',
  'Lamb',
  'Miscellaneous',
  'Pasta',
  'Pork',
  'Seafood',
  'Side',
  'Starter',
  'Vegan',
  'Vegetarian',
  'Breakfast',
  'Goat'
]

export const fetchAllRecipes = async () => {
  const requests = categories.map((category) =>
    api.get(`/filter.php?c=${category}`)
  );
  const responses = await Promise.all(requests);
  console.log('responses', responses.map(res => ({
    category: res.config.url?.split('=')[1],
    meals: res.data.meals
  })));
  const mappedData = new Map(responses.map(res => ([res.config.url?.split('=')[1], res.data.meals])));
  console.log('mappedData', mappedData);
    // category: res.config.url?.split('=')[1],
    // meals: res.data.meals})))
  // return responses.flatMap(res => res.data.meals); 
  return mappedData;
};

export const fetchRecipes = async (): Promise<Recipe[]> => {
  
  const response = await api.get(`/filter.php?c=Breakfast`);
  return response.data.meals || [];
};

export const fetchRecipeDetails = async (id: string): Promise<Recipe> => {
  const response = await api.get(`/lookup.php?i=${id}`);
  return response.data.meals[0];
};

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await api.get('/categories.php');
  return response.data.categories || [];
};

// Local storage functions for favorites
const FAVORITES_KEY = 'recipe-favorites';

export const getFavorites = async (): Promise<Recipe[]> => {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

export const addToFavorites = async (recipe: Recipe): Promise<Recipe[]> => {
  const favorites = await getFavorites();
  const newFavorites = [...favorites, recipe];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  return newFavorites;
};

export const removeFromFavorites = async (id: string): Promise<Recipe[]> => {
  const favorites = await getFavorites();
  const newFavorites = favorites.filter(recipe => recipe.idMeal !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  return newFavorites;
};