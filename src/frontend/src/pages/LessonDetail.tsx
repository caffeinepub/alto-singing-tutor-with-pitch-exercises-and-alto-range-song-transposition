import { useParams, useNavigate } from '@tanstack/react-router';
import { useLessons } from '../hooks/useLessons';
import { useCompleteLesson } from '../hooks/useCompleteLesson';
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function LessonDetail() {
  const { id } = useParams({ from: '/lessons/$id' });
  const navigate = useNavigate();
  const { data: lessons, isLoading } = useLessons();
  const { mutate: completeLesson, isPending } = useCompleteLesson();
  const [completed, setCompleted] = useState(false);

  const lesson = lessons?.find((l) => l.id.toString() === id);

  const handleComplete = () => {
    if (lesson) {
      completeLesson(lesson.id, {
        onSuccess: () => {
          setCompleted(true);
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="space-y-6 py-8">
        <button
          onClick={() => navigate({ to: '/lessons' })}
          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Lessons
        </button>
        <div className="rounded-2xl border-2 border-destructive/50 bg-destructive/10 p-8 text-center">
          <p className="text-lg font-bold text-destructive">Lesson not found, fam!</p>
        </div>
      </div>
    );
  }

  const difficultyStars = '⭐'.repeat(Number(lesson.difficulty));

  // Parse lesson content to extract sections
  const contentLines = lesson.content.split('\n').filter((line) => line.trim());
  const hasProTips = lesson.content.toLowerCase().includes('brainrot pro tip');

  // Function to render formatted content
  const renderContent = () => {
    return contentLines.map((line, idx) => {
      const trimmedLine = line.trim();

      // Main heading (single #)
      if (trimmedLine.startsWith('# ') && !trimmedLine.startsWith('## ')) {
        return (
          <h1 key={idx} className="mb-4 text-3xl font-black tracking-tight">
            {trimmedLine.substring(2)}
          </h1>
        );
      }

      // Subheading (##)
      if (trimmedLine.startsWith('## ')) {
        return (
          <h2 key={idx} className="mb-3 mt-6 text-2xl font-black tracking-tight">
            {trimmedLine.substring(3)}
          </h2>
        );
      }

      // Bold text (**text**)
      if (trimmedLine.startsWith('**') && trimmedLine.includes('**:')) {
        const parts = trimmedLine.split('**');
        return (
          <p key={idx} className="mb-3 text-lg font-bold">
            <span className="text-primary">{parts[1]}:</span> {parts[2]}
          </p>
        );
      }

      // Pro tip
      if (trimmedLine.startsWith('**Brainrot Pro Tip**:')) {
        return null; // Skip, will be rendered in separate section
      }

      // List items
      if (trimmedLine.startsWith('- ')) {
        return (
          <li key={idx} className="mb-2 ml-6 font-medium">
            {trimmedLine.substring(2)}
          </li>
        );
      }

      // Regular paragraph
      if (trimmedLine.length > 0 && !trimmedLine.startsWith('#')) {
        return (
          <p key={idx} className="mb-3 font-medium leading-relaxed">
            {trimmedLine}
          </p>
        );
      }

      return null;
    });
  };

  // Extract pro tips if available
  const extractProTips = () => {
    const proTipLines = contentLines.filter(
      (line) =>
        line.includes('Brainrot Pro Tip') ||
        (contentLines.indexOf(line) > contentLines.findIndex((l) => l.includes('Brainrot Pro Tip')) &&
          contentLines.findIndex((l) => l.includes('Brainrot Pro Tip')) !== -1)
    );

    if (proTipLines.length > 0) {
      const tipIndex = contentLines.findIndex((l) => l.includes('Brainrot Pro Tip'));
      if (tipIndex !== -1 && contentLines[tipIndex]) {
        const tipText = contentLines[tipIndex].split('**Brainrot Pro Tip**:')[1]?.trim();
        return tipText || null;
      }
    }
    return null;
  };

  const proTip = extractProTips();

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8">
      <button
        onClick={() => navigate({ to: '/lessons' })}
        className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Lessons
      </button>

      <div className="space-y-6 rounded-3xl border-2 border-border bg-card p-8 shadow-xl md:p-12">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-black tracking-tight md:text-4xl">{lesson.title}</h1>
            <span className="text-2xl">{difficultyStars}</span>
          </div>
          <p className="text-sm font-bold text-muted-foreground">Difficulty Level: {lesson.difficulty.toString()}</p>
        </div>

        {lesson.id === BigInt(1) && (
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/assets/generated/lesson-fractions.dim_600x400.png"
              alt="Fractions Lesson"
              className="w-full"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <div className="space-y-2 text-base leading-relaxed">{renderContent()}</div>
        </div>

        {(hasProTips || proTip) && (
          <div className="space-y-4 rounded-2xl bg-accent/20 p-6">
            <h2 className="text-xl font-black">Pro Tips 💡</h2>
            {proTip && <p className="text-sm font-semibold text-foreground">{proTip}</p>}
            <ul className="space-y-2 text-sm font-semibold">
              <li>✅ Take your time - no need to rush, bestie</li>
              <li>✅ Practice makes perfect (fr fr)</li>
              <li>✅ Don't be afraid to ask questions</li>
              <li>✅ Check out the practice problems after this</li>
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleComplete}
            disabled={isPending || completed}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-black text-primary-foreground shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            {isPending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" /> Saving...
              </>
            ) : completed ? (
              <>
                <CheckCircle className="h-5 w-5" /> Completed!
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5" /> Mark as Complete
              </>
            )}
          </button>

          <button
            onClick={() => navigate({ to: '/practice-mode' })}
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary bg-background px-8 py-4 text-lg font-black text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            Practice Problems
          </button>
        </div>

        {completed && (
          <div className="rounded-2xl border-2 border-primary/50 bg-primary/10 p-6 text-center">
            <p className="text-lg font-black text-primary">Skibidi! You completed this lesson! 🎉</p>
            <p className="mt-2 text-sm font-semibold text-muted-foreground">
              Your progress has been saved. Keep the streak going!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
