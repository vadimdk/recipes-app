import { useQuery } from '@tanstack/react-query';
import { fetchRecipeDetails } from '../api';

export function useRecipeDetails(id: string) {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipeDetails(id),
    enabled: !!id,
  });
}