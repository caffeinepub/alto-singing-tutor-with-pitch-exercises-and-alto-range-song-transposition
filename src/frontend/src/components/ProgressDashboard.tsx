import { ProgressView } from '../backend';
import AchievementBadge from './AchievementBadge';
import { Trophy, Flame, Target } from 'lucide-react';

interface ProgressDashboardProps {
  progress: ProgressView | null | undefined;
}

export default function ProgressDashboard({ progress }: ProgressDashboardProps) {
  if (!progress) {
    return (
      <div className="rounded-2xl border-2 border-border bg-card p-12 text-center">
        <p className="text-lg font-bold text-muted-foreground">
          No progress yet! Start learning to track your glow up! 🚀
        </p>
      </div>
    );
  }

  const totalScore = progress.practiceScores.reduce((sum, [, score]) => sum + Number(score), 0);
  const averageScore =
    progress.practiceScores.length > 0 ? Math.round(totalScore / progress.practiceScores.length) : 0;

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-4 rounded-2xl border-2 border-border bg-card p-6 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground">Lessons Completed</p>
              <p className="text-3xl font-black">{progress.completedLessons.length}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border-2 border-border bg-card p-6 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <Flame className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground">Current Streak</p>
              <p className="text-3xl font-black">{progress.streak.toString()} 🔥</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border-2 border-border bg-card p-6 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground">Average Score</p>
              <p className="text-3xl font-black">{averageScore}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 p-8 text-center">
        <p className="text-2xl font-black">
          {progress.streak > BigInt(0)
            ? `You're on fire! ${progress.streak.toString()} day streak! Keep it up, bestie! 🔥`
            : progress.completedLessons.length > 0
              ? "You're doing great! Keep that momentum going! 💪"
              : "Let's start your journey! Complete a lesson to begin your streak! 🚀"}
        </p>
      </div>

      {/* Achievements */}
      {progress.achievements.length > 0 && (
        <div className="space-y-6 rounded-2xl border-2 border-border bg-card p-8">
          <h2 className="text-2xl font-black">Your Achievements 🏆</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {progress.achievements.map((achievement, index) => (
              <AchievementBadge key={index} achievement={achievement} />
            ))}
          </div>
        </div>
      )}

      {/* Practice Scores */}
      {progress.practiceScores.length > 0 && (
        <div className="space-y-6 rounded-2xl border-2 border-border bg-card p-8">
          <h2 className="text-2xl font-black">Practice History 📊</h2>
          <div className="space-y-3">
            {progress.practiceScores.map(([problemId, score], index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-border bg-background p-4"
              >
                <span className="font-bold">Problem #{problemId.toString()}</span>
                <span className={`text-lg font-black ${Number(score) === 100 ? 'text-primary' : 'text-destructive'}`}>
                  {score.toString()}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
