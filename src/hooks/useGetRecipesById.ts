import { useQuery } from '@tanstack/react-query';
import { getRecipesById, Recipe,  } from '../api';

export function useGetRecipesById(favorites: Recipe[]) {
  return useQuery({
    queryKey: ['recipes', favorites],
    queryFn: () => getRecipesById(favorites),
    enabled: favorites.length > 0,
  });
}