import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useProgress } from '../hooks/useProgress';
import ProgressDashboard from '../components/ProgressDashboard';
import { LogIn, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';

export default function ProgressTracking() {
  const { identity, login, isLoggingIn, isInitializing } = useInternetIdentity();
  const { data: progress, isLoading, error, refetch, isRefetching } = useProgress();

  const isAuthenticated = identity && !identity.getPrincipal().isAnonymous();

  if (isInitializing) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="space-y-4 text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="text-sm font-semibold text-muted-foreground">Initializing authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="space-y-8 py-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">Your Progress 📊</h1>
          <p className="text-lg font-semibold text-muted-foreground">Track your learning journey!</p>
        </div>

        <div className="mx-auto max-w-2xl space-y-6 rounded-3xl border-2 border-border bg-card p-12 text-center shadow-xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
            <LogIn className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black">Login Required</h2>
            <p className="text-muted-foreground">
              You need to log in to view your progress and track your achievements. Your data is securely stored on the
              Internet Computer blockchain.
            </p>
          </div>
          <Button onClick={login} disabled={isLoggingIn} size="lg" className="gap-2">
            <LogIn className="h-5 w-5" />
            {isLoggingIn ? 'Logging in...' : 'Log In to Continue'}
          </Button>
          <p className="text-xs text-muted-foreground">
            Your progress is saved securely and will be available across all devices after login.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="space-y-4 text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="text-sm font-semibold text-muted-foreground">Loading your progress from the network...</p>
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
              Unable to load your progress from the backend canister. This could be due to network issues or the
              canister being temporarily unavailable.
            </p>
            <p className="text-xs opacity-75">
              Your progress is safely stored on the blockchain. Please check your internet connection and try again.
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

  return (
    <div className="space-y-8 py-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-black tracking-tight md:text-5xl">Your Progress 📊</h1>
        <p className="text-lg font-semibold text-muted-foreground">Track your learning journey!</p>
      </div>

      <ProgressDashboard progress={progress} />
    </div>
  );
}
