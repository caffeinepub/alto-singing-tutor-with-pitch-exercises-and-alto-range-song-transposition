import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { PracticeProblem } from '../backend';

export function usePracticeProblemsByTopic(topic: string) {
  const { actor, isFetching } = useActor();

  return useQuery<PracticeProblem[]>({
    queryKey: ['practiceProblems', topic],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProblemsByTopic(topic);
    },
    enabled: !!actor && !isFetching && !!topic,
  });
}
