import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ProgressView } from '../backend';

export function useProgress() {
  const { actor, isFetching } = useActor();

  return useQuery<ProgressView | null>({
    queryKey: ['progress'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProgress();
    },
    enabled: !!actor && !isFetching,
  });
}
