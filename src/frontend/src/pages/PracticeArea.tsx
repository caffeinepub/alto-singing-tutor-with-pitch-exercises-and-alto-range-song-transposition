import { usePracticeProblems } from '../hooks/usePracticeProblems';
import PracticeProblem from '../components/PracticeProblem';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { ChevronLeft, ChevronRight, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';

export default function PracticeArea() {
  const { data: problems, isLoading, error, refetch, isRefetching } = usePracticeProblems();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="space-y-4 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading practice problems from the network...</p>
          <p className="text-xs text-muted-foreground">This may take a moment</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription className="space-y-3">
            <p>
              Couldn't load practice problems from the backend canister. This could be due to network issues or the
              canister being temporarily unavailable.
            </p>
            <p className="text-xs opacity-75">
              Please check your internet connection and try refreshing the page. If the problem persists, the canister
              may be initializing.
            </p>
            {error instanceof Error && <p className="mt-2 text-xs font-mono opacity-75">Error: {error.message}</p>}
          </AlertDescription>
        </Alert>
        <div className="flex justify-center">
          <Button onClick={() => refetch()} disabled={isRefetching} className="gap-2">
            <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
            {isRefetching ? 'Retrying...' : 'Try Again'}
          </Button>
        </div>
      </div>
    );
  }

  if (!problems || problems.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-border bg-card p-12 text-center">
        <p className="text-lg font-bold text-muted-foreground">No practice problems available yet!</p>
      </div>
    );
  }

  const currentProblem = problems[currentIndex];

  const handleNext = () => {
    if (currentIndex < problems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="space-y-8 py-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-black tracking-tight md:text-5xl">Practice Time! 💪</h1>
        <p className="text-lg font-semibold text-muted-foreground">Solve problems and level up your math skills!</p>
        <div className="mx-auto flex max-w-md justify-center">
          <img
            src="/assets/generated/practice-hero.dim_400x400.png"
            alt="Practice"
            className="h-32 w-32 rounded-2xl shadow-xl"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between rounded-xl bg-card/50 p-4">
          <span className="text-sm font-bold text-muted-foreground">
            Problem {currentIndex + 1} of {problems.length}
          </span>
          <div className="mx-4 h-2 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / problems.length) * 100}%` }}
            />
          </div>
        </div>

        <PracticeProblem problem={currentProblem} />

        <div className="flex items-center justify-between gap-4">
          <Button onClick={handlePrevious} disabled={currentIndex === 0} variant="outline" className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button onClick={handleNext} disabled={currentIndex === problems.length - 1} className="gap-2">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
