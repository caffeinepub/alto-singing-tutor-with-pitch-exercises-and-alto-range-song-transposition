interface AchievementBadgeProps {
  achievement: string;
}

export default function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const getBadgeImage = (achievement: string) => {
    if (achievement.toLowerCase().includes('first') || achievement.toLowerCase().includes('lesson')) {
      return '/assets/generated/badge-first-lesson.dim_128x128.png';
    }
    if (achievement.toLowerCase().includes('streak')) {
      return '/assets/generated/badge-streak.dim_128x128.png';
    }
    return '/assets/generated/badge-first-lesson.dim_128x128.png';
  };

  return (
    <div className="flex items-center gap-4 rounded-xl border-2 border-primary/30 bg-primary/5 p-4 transition-all hover:scale-105 hover:border-primary/50">
      <img
        src={getBadgeImage(achievement)}
        alt={achievement}
        className="h-16 w-16"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <p className="font-black leading-tight">{achievement}</p>
    </div>
  );
}
