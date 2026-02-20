import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { PracticeSession } from '../backend';

export function useSubmitPracticeSession() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (session: PracticeSession) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.recordPracticeSession(session);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress'] });
    },
  });
}
