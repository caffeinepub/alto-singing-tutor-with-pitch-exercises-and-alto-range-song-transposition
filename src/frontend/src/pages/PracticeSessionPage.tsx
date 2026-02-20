import { useParams, useNavigate } from '@tanstack/react-router';
import { usePracticeProblemsByTopic } from '../hooks/usePracticeProblemsByTopic';
import { useState, useEffect } from 'react';
import PracticeProblem from '../components/PracticeProblem';
import PracticeSessionHeader from '../components/PracticeSessionHeader';
import { usePracticeSessionTimer } from '../hooks/usePracticeSessionTimer';
import { useSubmitPracticeSession } from '../hooks/useSubmitPracticeSession';
import { Button } from '../components/ui/button';
import { ChevronLeft, ChevronRight, Flag, Loader2, AlertCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';

export default function PracticeSessionPage() {
  const { topic } = useParams({ strict: false }) as { topic: string };
  const navigate = useNavigate();
  const { data: problems, isLoading, error } = usePracticeProblemsByTopic(topic);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const { elapsedSeconds, formattedTime } = usePracticeSessionTimer();
  const submitSession = useSubmitPracticeSession();

  useEffect(() => {
    if (problems && problems.length > 0) {
      setAnswers(new Array(problems.length).fill(false));
    }
  }, [problems]);

  const handleAnswerSubmit = (isCorrect: boolean) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = isCorrect;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (problems && currentIndex < problems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFinish = async () => {
    if (!problems) return;

    const correctCount = answers.filter((a) => a).length;
    const session = {
      topic,
      problemsAttempted: BigInt(problems.length),
      correctCount: BigInt(correctCount),
      duration: BigInt(elapsedSeconds),
      timestamp: BigInt(Date.now()),
    };

    await submitSession.mutateAsync(session);
    navigate({
      to: '/practice-mode/$topic/summary',
      params: { topic },
      search: {
        correct: correctCount,
        total: problems.length,
        time: elapsedSeconds,
      },
    });
  };

  const handleExit = () => {
    navigate({ to: '/practice-mode' });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-sm text-muted-foreground">Loading practice session...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>
            Couldn't load practice problems from the backend. Please check your connection and try again.
            {error instanceof Error && (
              <span className="block mt-2 text-xs opacity-75">Error: {error.message}</span>
            )}
          </AlertDescription>
        </Alert>
        <div className="mt-6 text-center">
          <Button onClick={() => navigate({ to: '/practice-mode' })} variant="outline">
            Back to Practice Mode
          </Button>
        </div>
      </div>
    );
  }

  if (!problems || problems.length === 0) {
    return (
      <div className="space-y-6 py-12 text-center">
        <div className="rounded-2xl border-2 border-border bg-card p-12">
          <p className="text-lg font-bold text-muted-foreground">
            No problems available for this topic yet!
          </p>
        </div>
        <Button onClick={() => navigate({ to: '/practice-mode' })} variant="outline">
          Back to Practice Mode
        </Button>
      </div>
    );
  }

  const currentProblem = problems[currentIndex];
  const correctCount = answers.filter((a) => a).length;

  return (
    <div className="space-y-6 pb-8">
      <PracticeSessionHeader
        topic={topic}
        problemsCompleted={currentIndex + 1}
        totalProblems={problems.length}
      />

      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between rounded-xl bg-card/50 p-4">
          <span className="text-sm font-bold text-muted-foreground">
            Problem {currentIndex + 1} of {problems.length}
          </span>
          <div className="h-2 flex-1 mx-4 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / problems.length) * 100}%` }}
            />
          </div>
          <span className="text-sm font-bold text-primary">
            {correctCount} correct
          </span>
        </div>

        <PracticeProblem problem={currentProblem} onAnswerSubmit={handleAnswerSubmit} />

        <div className="flex items-center justify-between gap-4">
          <Button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            variant="outline"
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                Exit Session
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Exit Practice Session?</AlertDialogTitle>
                <AlertDialogDescription>
                  Your progress won't be saved if you exit now. Are you sure you want to leave?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Continue Practicing</AlertDialogCancel>
                <AlertDialogAction onClick={handleExit}>Exit</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {currentIndex === problems.length - 1 ? (
            <Button onClick={handleFinish} className="gap-2" disabled={submitSession.isPending}>
              {submitSession.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Finishing...
                </>
              ) : (
                <>
                  <Flag className="h-4 w-4" />
                  Finish
                </>
              )}
            </Button>
          ) : (
            <Button onClick={handleNext} className="gap-2">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
