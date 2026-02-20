import { useNavigate } from '@tanstack/react-router';
import {
  Calculator,
  Divide,
  Percent,
  Variable,
  Shapes,
  Scale,
  X,
  Plus,
  Loader2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { usePracticeProblems } from '../hooks/usePracticeProblems';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Button } from '../components/ui/button';

const topics = [
  {
    id: 'fractions',
    name: 'Fractions',
    icon: Calculator,
    description: 'Slice and dice numbers like pizza, no cap',
    color: 'from-pink-500/20 to-rose-500/20 border-pink-500/30 hover:border-pink-500/50',
  },
  {
    id: 'decimals',
    name: 'Decimals',
    icon: Divide,
    description: 'Point game strong, fr fr',
    color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 hover:border-blue-500/50',
  },
  {
    id: 'percentages',
    name: 'Percentages',
    icon: Percent,
    description: 'Get that 100% energy, bestie',
    color: 'from-purple-500/20 to-violet-500/20 border-purple-500/30 hover:border-purple-500/50',
  },
  {
    id: 'algebra',
    name: 'Algebra',
    icon: Variable,
    description: 'Solve for X like a mystery, lowkey fun',
    color: 'from-green-500/20 to-emerald-500/20 border-green-500/30 hover:border-green-500/50',
  },
  {
    id: 'geometry',
    name: 'Geometry',
    icon: Shapes,
    description: 'Shapes hitting different, on god',
    color: 'from-orange-500/20 to-amber-500/20 border-orange-500/30 hover:border-orange-500/50',
  },
  {
    id: 'ratios',
    name: 'Ratios',
    icon: Scale,
    description: 'Balance the sauce, keep it bussin',
    color: 'from-red-500/20 to-pink-500/20 border-red-500/30 hover:border-red-500/50',
  },
  {
    id: 'multiplication',
    name: 'Multiplication',
    icon: X,
    description: 'Times tables go brr, multiply the vibes',
    color: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30 hover:border-indigo-500/50',
  },
  {
    id: 'division',
    name: 'Division',
    icon: Plus,
    description: 'Split it up fair, share the W',
    color: 'from-teal-500/20 to-cyan-500/20 border-teal-500/30 hover:border-teal-500/50',
  },
];

export default function PracticeModePage() {
  const navigate = useNavigate();
  const { data: problems, isLoading, error, refetch, isRefetching } = usePracticeProblems();

  const handleTopicClick = (topicId: string) => {
    navigate({ to: '/practice-mode/$topic', params: { topic: topicId } });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="space-y-4 text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="text-sm font-semibold text-muted-foreground">Loading practice topics from the network...</p>
          <p className="text-xs text-muted-foreground">Verifying available problems</p>
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
              Unable to connect to the backend canister. This could be due to network issues or the canister being
              temporarily unavailable.
            </p>
            <p className="text-xs opacity-75">
              Please check your internet connection and try again. If the problem persists, the canister may be
              initializing.
            </p>
            {error instanceof Error && (
              <p className="mt-2 text-xs font-mono opacity-75">Error: {error.message}</p>
            )}
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

  // Verify all topics have problems available
  const topicsWithProblems = topics.map((topic) => {
    const topicProblems = problems?.filter((p) => p.topic === topic.id) || [];
    return {
      ...topic,
      problemCount: topicProblems.length,
      available: topicProblems.length > 0,
    };
  });

  return (
    <div className="space-y-8 py-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-black tracking-tight md:text-5xl">Practice Mode 🎯</h1>
        <p className="text-lg font-semibold text-muted-foreground">
          Choose your topic and start grinding! Each session tracks your progress.
        </p>
        <div className="mx-auto flex max-w-md justify-center">
          <img
            src="/assets/generated/practice-hero.dim_400x400.png"
            alt="Practice Mode"
            className="h-48 w-48 rounded-2xl shadow-xl"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {topicsWithProblems.map((topic) => {
          const Icon = topic.icon;
          return (
            <button
              key={topic.id}
              onClick={() => handleTopicClick(topic.id)}
              disabled={!topic.available}
              className={`group relative overflow-hidden rounded-2xl border-2 bg-gradient-to-br p-6 text-left transition-all hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 ${topic.color}`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/50 backdrop-blur-sm">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  {topic.available && (
                    <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-black text-primary">
                      {topic.problemCount} problems
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black">{topic.name}</h3>
                  <p className="text-sm font-semibold text-muted-foreground">{topic.description}</p>
                </div>
                {!topic.available && (
                  <div className="rounded-lg bg-destructive/10 px-3 py-2 text-xs font-bold text-destructive">
                    No problems available yet
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mx-auto max-w-2xl rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 text-center">
        <p className="text-sm font-bold text-muted-foreground">
          💡 Pro Tip: Complete practice sessions to track your progress and earn achievements!
        </p>
      </div>
    </div>
  );
}
