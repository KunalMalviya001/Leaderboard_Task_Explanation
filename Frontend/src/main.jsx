import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ErrorBoundary } from './ErrorBoundary';
import LoadingSpinner from './LoadingSpinner';

const App = lazy(() => import('./App.jsx'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>,
);
