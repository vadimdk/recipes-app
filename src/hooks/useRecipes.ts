import { useQuery } from '@tanstack/react-query';
import { fetchAllRecipes } from '../api';

export function useRecipes() {
  return useQuery({
    queryKey: ['allRecipes'],
    queryFn: () => fetchAllRecipes(),
  });
}