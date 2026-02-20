import { useParams, useNavigate, useSearch } from '@tanstack/react-router';
import { useSubmitPracticeSession } from '../hooks/useSubmitPracticeSession';
import { Trophy, Clock, Target, TrendingUp, RotateCcw, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

export default function PracticeSessionSummary() {
  const { topic } = useParams({ strict: false });
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as {
    problemsAttempted?: number;
    correctCount?: number;
    duration?: number;
  };

  const { mutate: submitSession } = useSubmitPracticeSession();

  const problemsAttempted = search.problemsAttempted || 0;
  const correctCount = search.correctCount || 0;
  const duration = search.duration || 0;
  const accuracy = problemsAttempted > 0 ? Math.round((correctCount / problemsAttempted) * 100) : 0;

  useEffect(() => {
    // Submit session results to backend
    if (topic && problemsAttempted > 0) {
      submitSession({
        topic,
        problemsAttempted: BigInt(problemsAttempted),
        correctCount: BigInt(correctCount),
        duration: BigInt(duration),
        timestamp: BigInt(Date.now()),
      });
    }
  }, [topic, problemsAttempted, correctCount, duration, submitSession]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getMotivationalMessage = () => {
    if (accuracy >= 90) {
      return {
        title: "Bussin' fr fr! 🔥",
        message: "You're absolutely cooking, fam! That's some S-tier performance right there! Keep that energy going and you'll be unstoppable! 💯",
      };
    } else if (accuracy >= 70) {
      return {
        title: "Not bad, fam! 💪",
        message: "You're on the right track! A few more practice sessions and you'll be dominating this topic. Lock in and keep grinding! 🎯",
      };
    } else {
      return {
        title: "No cap, you'll get it next time! 🌟",
        message: "Everyone starts somewhere, bestie! The fact that you're practicing means you're already winning. Keep at it and watch yourself level up! 🚀",
      };
    }
  };

  const motivation = getMotivationalMessage();
  const topicName = topic ? topic.charAt(0).toUpperCase() + topic.slice(1) : 'Practice';

  const handleRetry = () => {
    navigate({ to: '/practice-mode/$topic', params: { topic: topic || '' } });
  };

  const handleBackToTopics = () => {
    navigate({ to: '/practice-mode' });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-8">
      {/* Header */}
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-black tracking-tight md:text-5xl">Session Complete! 🎉</h1>
        <p className="text-lg font-semibold text-muted-foreground">
          {topicName} Practice Session
        </p>
      </div>

      {/* Trophy Image for High Accuracy */}
      {accuracy > 80 && (
        <div className="flex justify-center">
          <img
            src="/assets/generated/practice-trophy.dim_128x128.png"
            alt="Trophy"
            className="h-32 w-32 animate-bounce"
          />
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-3xl border-2 border-border bg-card p-8 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground">Problems Attempted</p>
              <p className="text-3xl font-black">{problemsAttempted}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border-2 border-border bg-card p-8 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground">Correct Answers</p>
              <p className="text-3xl font-black">{correctCount}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border-2 border-border bg-card p-8 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground">Accuracy</p>
              <p className="text-3xl font-black">{accuracy}%</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border-2 border-border bg-card p-8 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground">Time Spent</p>
              <p className="text-3xl font-black">{formatTime(duration)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="rounded-3xl border-2 border-primary/50 bg-primary/10 p-8">
        <h2 className="mb-4 text-2xl font-black text-primary">{motivation.title}</h2>
        <p className="text-lg font-semibold text-foreground">{motivation.message}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={handleRetry}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-black text-primary-foreground shadow-xl transition-all hover:scale-105"
        >
          <RotateCcw className="h-5 w-5" />
          Retry {topicName}
        </button>
        <button
          onClick={handleBackToTopics}
          className="inline-flex items-center gap-2 rounded-full border-2 border-primary bg-background px-8 py-4 text-lg font-black text-primary transition-all hover:bg-primary hover:text-primary-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Topics
        </button>
      </div>
    </div>
  );
}
