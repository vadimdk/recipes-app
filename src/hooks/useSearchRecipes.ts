import { useQuery } from '@tanstack/react-query';
import { searchRecipes } from '../api';

export function useSearchRecipes(search: string) {
  return useQuery({
    queryKey: ['recipes', search],
    queryFn: () => searchRecipes(search),
    enabled: search.length > 0,
  });
}