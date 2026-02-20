import { Outlet } from '@tanstack/react-router';
import Navigation from './Navigation';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <Navigation />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="mt-16 border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Brainrot Math. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with 💚 using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'brainrot-math'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
