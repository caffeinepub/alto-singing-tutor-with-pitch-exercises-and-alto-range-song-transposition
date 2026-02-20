import { Link, useRouterState } from '@tanstack/react-router';
import { Home, BookOpen, Dumbbell, Trophy, Target, LogIn, LogOut, User } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default function Navigation() {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/lessons', label: 'Lessons', icon: BookOpen },
    { path: '/practice', label: 'Practice', icon: Dumbbell },
    { path: '/practice-mode', label: 'Practice Mode', icon: Target },
    { path: '/progress', label: 'Progress', icon: Trophy },
  ];

  const isAuthenticated = identity && !identity.getPrincipal().isAnonymous();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-lg">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/assets/generated/logo.dim_256x256.png" alt="Brainrot Math" className="h-10 w-10" />
            <span className="text-xl font-black tracking-tight text-primary">Brainrot Math</span>
          </Link>

          <div className="flex items-center gap-2">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-lg'
                          : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="ml-2 border-l border-border/50 pl-2">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">Account</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                      {identity.getPrincipal().toString().slice(0, 20)}...
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={clear} className="gap-2 text-destructive focus:text-destructive">
                      <LogOut className="h-4 w-4" />
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={login}
                  disabled={isLoggingIn}
                  size="sm"
                  className="gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">{isLoggingIn ? 'Logging in...' : 'Log In'}</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
