import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getFavorites, addToFavorites, removeFromFavorites, type Recipe } from '../api';

export function useFavorites() {
  const queryClient = useQueryClient();

  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => getFavorites(),
  });

  const addFavoriteMutation = useMutation({
    mutationFn: (recipe: Recipe) => addToFavorites(recipe),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: (id: string) => removeFromFavorites(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  const isFavorite = (id: string) => favorites.some((recipe: Recipe) => recipe.idMeal === id);

  return {
    favorites,
    addFavorite: addFavoriteMutation.mutate,
    removeFavorite: removeFavoriteMutation.mutate,
    isFavorite,
  };
}