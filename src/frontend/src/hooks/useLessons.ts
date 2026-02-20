import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Lesson } from '../backend';

export function useLessons() {
  const { actor, isFetching } = useActor();

  return useQuery<Lesson[]>({
    queryKey: ['lessons'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLessons();
    },
    enabled: !!actor && !isFetching,
  });
}
