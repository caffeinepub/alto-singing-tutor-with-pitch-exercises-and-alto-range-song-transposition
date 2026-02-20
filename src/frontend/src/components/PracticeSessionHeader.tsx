import { usePracticeSessionTimer } from '../hooks/usePracticeSessionTimer';
import { Clock, Target } from 'lucide-react';

interface PracticeSessionHeaderProps {
  topic: string;
  problemsCompleted: number;
  totalProblems: number;
}

export default function PracticeSessionHeader({
  topic,
  problemsCompleted,
  totalProblems,
}: PracticeSessionHeaderProps) {
  const { formattedTime } = usePracticeSessionTimer();

  return (
    <div className="sticky top-16 z-40 rounded-2xl border-2 border-primary/30 bg-card/95 p-6 shadow-xl backdrop-blur-lg">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-primary">{topic} Practice</h2>
          <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
            <Target className="h-4 w-4" />
            <span>
              {problemsCompleted} of {totalProblems} problems completed
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-primary/10 px-6 py-3">
          <Clock className="h-5 w-5 text-primary" />
          <div className="text-center">
            <p className="text-xs font-bold text-muted-foreground">Time Elapsed</p>
            <p className="text-2xl font-black text-primary">{formattedTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
