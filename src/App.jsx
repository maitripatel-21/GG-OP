import { SecurityProvider } from './context/SecurityContext';
import PopupPage from './pages/Popup/PopupPage';
import DashboardPage from './pages/Dashboard/DashboardPage';

/**
 * Root React Application Wrapper
 * @param {object} props
 * @param {'popup' | 'options'} props.mode
 */
export default function App({ mode = 'popup' }) {
  return (
    <SecurityProvider>
      {mode === 'popup' ? (
        <div className="w-full min-h-[560px] bg-guard-bg text-slate-100 selection:bg-guard-cyan/30">
          <PopupPage />
        </div>
      ) : (
        <div className="w-full min-h-screen bg-guard-bg text-slate-100 selection:bg-guard-cyan/30">
          <DashboardPage />
        </div>
      )}
    </SecurityProvider>
  );
}
