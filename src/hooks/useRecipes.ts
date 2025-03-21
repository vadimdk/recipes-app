import { useQuery } from '@tanstack/react-query';
import { fetchAllRecipes } from '../api';

// export function useRecipes(search: string) {
//   return useQuery({
//     queryKey: ['recipes', search],
//     queryFn: () => fetchRecipes(search),
//     enabled: search.length > 0,
//   });
// }

export function useRecipes() {
  return useQuery({
    queryKey: ['allRecipes'],
    queryFn: () => fetchAllRecipes(),
  });
}