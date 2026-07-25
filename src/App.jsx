import { SecurityProvider } from './context/SecurityContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import PopupPage from './pages/Popup/PopupPage';
import DashboardPage from './pages/Dashboard/DashboardPage';

/**
 * Root React Application Container
 * @param {object} props
 * @param {'popup' | 'options'} props.mode
 */
export default function App({ mode = 'popup' }) {
  return (
    <ErrorBoundary>
      <SecurityProvider>
        {mode === 'popup' ? (
          <main
            role="main"
            aria-label="Gorillaz Guard Extension Popup"
            className="w-full min-h-[560px] bg-guard-bg text-slate-100 selection:bg-guard-cyan/30"
          >
            <PopupPage />
          </main>
        ) : (
          <main
            role="main"
            aria-label="Gorillaz Guard Security Dashboard"
            className="w-full min-h-screen bg-guard-bg text-slate-100 selection:bg-guard-cyan/30"
          >
            <DashboardPage />
          </main>
        )}
      </SecurityProvider>
    </ErrorBoundary>
  );
}
