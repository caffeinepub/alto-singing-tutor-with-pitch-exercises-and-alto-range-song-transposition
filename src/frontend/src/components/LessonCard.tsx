import { Lesson } from '../backend';
import { BookOpen } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
  onClick: () => void;
}

export default function LessonCard({ lesson, onClick }: LessonCardProps) {
  const difficultyStars = '⭐'.repeat(Number(lesson.difficulty));
  
  // Extract a clean preview from the content (first non-heading line)
  const getPreview = () => {
    const lines = lesson.content.split('\n').filter(line => line.trim());
    for (const line of lines) {
      const trimmed = line.trim();
      // Skip headings and find first meaningful content
      if (!trimmed.startsWith('#') && !trimmed.startsWith('**') && trimmed.length > 20) {
        return trimmed;
      }
    }
    // Fallback to first 100 characters
    return lesson.content.substring(0, 100).replace(/[#*]/g, '');
  };

  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl border-2 border-border bg-card p-6 text-left shadow-lg transition-all hover:scale-105 hover:shadow-2xl"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 transition-all group-hover:bg-primary/30">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl">{difficultyStars}</span>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-black leading-tight">{lesson.title}</h3>
          <p className="line-clamp-2 text-sm font-medium text-muted-foreground">{getPreview()}</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-primary">
          <span>Start Lesson</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </button>
  );
}
