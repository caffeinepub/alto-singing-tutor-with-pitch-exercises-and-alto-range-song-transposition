import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

interface SubmitScoreParams {
  problemId: bigint;
  score: bigint;
}

export function useSubmitPracticeScore() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ problemId, score }: SubmitScoreParams) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitPracticeScore(problemId, score);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress'] });
    },
  });
}
