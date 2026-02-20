import { PracticeProblem as PracticeProblemType } from '../backend';
import { useSubmitPracticeScore } from '../hooks/useSubmitPracticeScore';
import { useState } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface PracticeProblemProps {
  problem: PracticeProblemType;
  onAnswerSubmit?: (isCorrect: boolean) => void;
}

export default function PracticeProblem({ problem, onAnswerSubmit }: PracticeProblemProps) {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const { mutate: submitScore, isPending } = useSubmitPracticeScore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isCorrect = answer.trim().toLowerCase() === problem.answer.toLowerCase();
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    submitScore({
      problemId: problem.id,
      score: isCorrect ? BigInt(100) : BigInt(0),
    });

    // Notify parent component if callback provided
    if (onAnswerSubmit) {
      onAnswerSubmit(isCorrect);
    }
  };

  const handleReset = () => {
    setAnswer('');
    setFeedback(null);
  };

  return (
    <div className="space-y-6 rounded-3xl border-2 border-border bg-card p-8 shadow-xl">
      <div className="space-y-4">
        <h2 className="text-2xl font-black leading-tight">{problem.question}</h2>
        <p className="text-sm font-semibold text-muted-foreground">
          Drop your answer below and let's see if you're cooking! 🔥
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="answer" className="block text-sm font-bold">
            Your Answer:
          </label>
          <input
            id="answer"
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={feedback !== null || isPending}
            className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-lg font-semibold transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
            placeholder="Type your answer here..."
          />
        </div>

        {feedback === null ? (
          <button
            type="submit"
            disabled={!answer.trim() || isPending}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-black text-primary-foreground shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            {isPending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" /> Checking...
              </>
            ) : (
              'Submit Answer'
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary bg-background px-8 py-4 text-lg font-black text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            Try Another
          </button>
        )}
      </form>

      {feedback === 'correct' && (
        <div className="rounded-2xl border-2 border-primary/50 bg-primary/10 p-6">
          <div className="flex items-start gap-4">
            <CheckCircle className="h-8 w-8 flex-shrink-0 text-primary" />
            <div className="space-y-2">
              <p className="text-xl font-black text-primary">Skibidi! That's correct! 🎉</p>
              <p className="text-sm font-semibold text-muted-foreground">
                You're absolutely cooking, fam! Keep that energy going! 💯
              </p>
            </div>
          </div>
        </div>
      )}

      {feedback === 'incorrect' && (
        <div className="rounded-2xl border-2 border-destructive/50 bg-destructive/10 p-6">
          <div className="flex items-start gap-4">
            <XCircle className="h-8 w-8 flex-shrink-0 text-destructive" />
            <div className="space-y-2">
              <p className="text-xl font-black text-destructive">Not quite, fam - try again! 💪</p>
              <p className="text-sm font-semibold text-muted-foreground">
                The correct answer is: <span className="font-black text-foreground">{problem.answer}</span>
              </p>
              <p className="text-sm font-semibold text-muted-foreground">
                No cap, everyone makes mistakes! Lock in and you'll get the next one! 🔥
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
