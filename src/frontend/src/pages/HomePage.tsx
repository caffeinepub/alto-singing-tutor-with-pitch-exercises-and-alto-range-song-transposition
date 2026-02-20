import { Link } from '@tanstack/react-router';
import { ArrowRight, Zap, Brain, TrendingUp, Target } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function HomePage() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const isAuthenticated = identity && !identity.getPrincipal().isAnonymous();

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 via-accent/30 to-secondary/20 p-8 md:p-12">
        <div className="relative z-10 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Math That Hits Different 🔥
            </h1>
            <p className="text-lg font-semibold text-muted-foreground md:text-xl">
              No cap, fr fr - learn math with the most bussin' brainrot vibes. Skibidi your way to straight A's!
            </p>
            <div className="flex flex-wrap gap-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/lessons"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-black text-primary-foreground shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
                  >
                    Start Learning <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link
                    to="/practice"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-primary bg-background px-8 py-4 text-lg font-black text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                  >
                    Practice Now
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={login}
                    disabled={isLoggingIn}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-black text-primary-foreground shadow-xl transition-all hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isLoggingIn ? 'Logging in...' : 'Log In to Start'} <ArrowRight className="h-5 w-5" />
                  </button>
                  <Link
                    to="/lessons"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-primary bg-background px-8 py-4 text-lg font-black text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                  >
                    Browse Lessons
                  </Link>
                </>
              )}
            </div>
            {!isAuthenticated && (
              <p className="text-sm font-semibold text-muted-foreground">
                💡 Log in to save your progress and track achievements
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <img
              src="/assets/generated/mascot.dim_400x400.png"
              alt="Brainrot Math Mascot"
              className="max-w-full rounded-2xl shadow-2xl"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
        <div className="absolute inset-0 opacity-50">
          <img
            src="/assets/generated/hero-banner.dim_1200x400.png"
            alt=""
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </section>

      {/* Features */}
      <section className="space-y-8">
        <h2 className="text-center text-3xl font-black tracking-tight md:text-4xl">Why This App is Lowkey Fire</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-4 rounded-2xl border-2 border-border bg-card p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-black">Instant Feedback</h3>
            <p className="text-muted-foreground">
              Get that dopamine hit with instant feedback on every problem. We'll tell you if you're cooking or need to
              lock in!
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border-2 border-border bg-card p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-black">Brainrot Lessons</h3>
            <p className="text-muted-foreground">
              Learn math concepts explained with the most unhinged brainrot energy. Education has never been this
              bussin'!
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border-2 border-border bg-card p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-black">Track Progress</h3>
            <p className="text-muted-foreground">
              Watch your streak grow and unlock achievements. Your progress is saved on the blockchain - no cap!
            </p>
          </div>
        </div>
      </section>

      {/* Practice Mode CTA */}
      <section className="rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 p-8 md:p-12">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="order-2 flex justify-center md:order-1">
            <img
              src="/assets/generated/practice-hero.dim_400x400.png"
              alt="Practice Mode"
              className="max-w-full rounded-2xl shadow-2xl"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div className="order-1 space-y-6 md:order-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">Practice Mode Unlocked! 🎯</h2>
            <p className="text-lg font-semibold text-muted-foreground">
              Choose from 8 different math topics and grind through problems. Track your time, accuracy, and level up
              your skills!
            </p>
            <Link
              to="/practice-mode"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-black text-primary-foreground shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
            >
              Start Practice Mode <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="space-y-8 text-center">
        <h2 className="text-3xl font-black tracking-tight md:text-4xl">Ready to Lock In?</h2>
        <p className="mx-auto max-w-2xl text-lg font-semibold text-muted-foreground">
          Join the brainrot math revolution. Start learning today and become the GOAT of mathematics!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/lessons"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-black text-primary-foreground shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
              >
                Browse Lessons <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/practice-mode"
                className="inline-flex items-center gap-2 rounded-full border-2 border-primary bg-background px-8 py-4 text-lg font-black text-primary transition-all hover:bg-primary hover:text-primary-foreground"
              >
                Practice Mode
              </Link>
            </>
          ) : (
            <button
              onClick={login}
              disabled={isLoggingIn}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-black text-primary-foreground shadow-xl transition-all hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoggingIn ? 'Logging in...' : 'Get Started'} <ArrowRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
