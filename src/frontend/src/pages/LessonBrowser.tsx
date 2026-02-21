import { useLessons } from '../hooks/useLessons';
import LessonCard from '../components/LessonCard';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

export default function LessonBrowser() {
  const { data: lessons, isLoading, error, refetch, isRefetching } = useLessons();
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<string>('all');

  const topics = [
    { value: 'all', label: 'All Topics', emoji: '📚' },
    { value: 'fractions', label: 'Fractions', emoji: '🍕' },
    { value: 'decimals', label: 'Decimals', emoji: '🔢' },
    { value: 'percentages', label: 'Percentages', emoji: '📊' },
    { value: 'algebra', label: 'Algebra', emoji: '🧮' },
    { value: 'geometry', label: 'Geometry', emoji: '📐' },
    { value: 'ratios', label: 'Ratios', emoji: '⚖️' },
    { value: 'multiplication', label: 'Multiplication', emoji: '✖️' },
    { value: 'division', label: 'Division', emoji: '➗' },
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="space-y-4 text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="text-sm font-semibold text-muted-foreground">Loading lessons from the network...</p>
          <p className="text-xs text-muted-foreground">This may take a moment on first load</p>
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

  if (!lessons || lessons.length === 0) {
    return (
      <div className="space-y-6 py-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">Brainrot Lessons 📚</h1>
          <p className="text-lg font-semibold text-muted-foreground">Master math with the most bussin' content!</p>
        </div>
        <div className="rounded-2xl border-2 border-border bg-card p-12 text-center">
          <p className="text-lg font-bold text-muted-foreground">No lessons available yet!</p>
          <p className="mt-2 text-sm text-muted-foreground">Check back soon for fresh content.</p>
        </div>
      </div>
    );
  }

  const sortedLessons = [...lessons].sort((a, b) => Number(a.id) - Number(b.id));
  
  const filteredLessons = selectedTopic === 'all' 
    ? sortedLessons 
    : sortedLessons.filter(lesson => lesson.topic === selectedTopic);

  const getLessonCountByTopic = (topic: string) => {
    if (topic === 'all') return lessons.length;
    return lessons.filter(l => l.topic === topic).length;
  };

  return (
    <div className="space-y-8 py-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-black tracking-tight md:text-5xl">Brainrot Lessons 📚</h1>
        <p className="text-lg font-semibold text-muted-foreground">Master math with the most bussin' content!</p>
        <p className="text-sm font-bold text-primary">{lessons.length} Lessons Available</p>
      </div>

      <Tabs value={selectedTopic} onValueChange={setSelectedTopic} className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex h-auto w-auto flex-wrap justify-center gap-2 bg-transparent p-0">
            {topics.map((topic) => (
              <TabsTrigger
                key={topic.value}
                value={topic.value}
                className="rounded-full border-2 border-border bg-card px-4 py-2 text-sm font-bold transition-all data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:scale-105"
              >
                <span className="mr-2">{topic.emoji}</span>
                {topic.label}
                <span className="ml-2 rounded-full bg-background/20 px-2 py-0.5 text-xs">
                  {getLessonCountByTopic(topic.value)}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value={selectedTopic} className="mt-8">
          {filteredLessons.length === 0 ? (
            <div className="rounded-2xl border-2 border-border bg-card p-12 text-center">
              <p className="text-lg font-bold text-muted-foreground">No lessons found for this topic!</p>
              <p className="mt-2 text-sm text-muted-foreground">Try selecting a different topic.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredLessons.map((lesson) => (
                <LessonCard
                  key={lesson.id.toString()}
                  lesson={lesson}
                  onClick={() => navigate({ to: '/lessons/$id', params: { id: lesson.id.toString() } })}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
