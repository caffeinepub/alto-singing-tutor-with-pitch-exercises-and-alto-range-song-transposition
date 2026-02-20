import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LessonBrowser from './pages/LessonBrowser';
import LessonDetail from './pages/LessonDetail';
import PracticeArea from './pages/PracticeArea';
import ProgressTracking from './pages/ProgressTracking';
import PracticeModePage from './pages/PracticeModePage';
import PracticeSessionPage from './pages/PracticeSessionPage';
import PracticeSessionSummary from './pages/PracticeSessionSummary';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const lessonsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/lessons',
  component: LessonBrowser,
});

const lessonDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/lessons/$id',
  component: LessonDetail,
});

const practiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/practice',
  component: PracticeArea,
});

const progressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/progress',
  component: ProgressTracking,
});

const practiceModeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/practice-mode',
  component: PracticeModePage,
});

const practiceSessionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/practice-mode/$topic',
  component: PracticeSessionPage,
});

const practiceSessionSummaryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/practice-mode/$topic/summary',
  component: PracticeSessionSummary,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  lessonsRoute,
  lessonDetailRoute,
  practiceRoute,
  progressRoute,
  practiceModeRoute,
  practiceSessionRoute,
  practiceSessionSummaryRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
