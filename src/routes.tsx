import { createBrowserRouter } from 'react-router-dom';
import { AllRecipes } from './pages/AllRecipes';
import { RecipeDetails } from './pages/RecipeDetails';
import { FavoriteRecipes } from './pages/FavoriteRecipes';
import App from './App';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <AllRecipes />,
      },
      {
        path: 'recipe/:id',
        element: <RecipeDetails />,
      },
      {
        path: 'favorites',
        element: <FavoriteRecipes />,
      },
    ],
  },
]);