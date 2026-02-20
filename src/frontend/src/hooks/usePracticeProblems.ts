import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { PracticeProblem } from '../backend';

export function usePracticeProblems() {
  const { actor, isFetching } = useActor();

  return useQuery<PracticeProblem[]>({
    queryKey: ['practiceProblems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPracticeProblems();
    },
    enabled: !!actor && !isFetching,
  });
}
