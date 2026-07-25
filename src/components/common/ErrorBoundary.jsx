import { Component } from 'react';
import GlassContainer from './GlassContainer';
import PrimaryButton from '../buttons/PrimaryButton';
import { AlertOctagon, RotateCcw } from 'lucide-react';

/**
 * Production React Error Boundary Component
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Gorillaz Guard ErrorBoundary caught an exception:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 max-w-md mx-auto min-h-[400px] flex items-center justify-center font-sans text-slate-100">
          <GlassContainer className="p-6 space-y-4 text-center border-rose-500/30">
            <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 w-fit mx-auto border border-rose-500/20">
              <AlertOctagon className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white">Something Went Wrong</h2>
              <p className="text-xs text-slate-400">
                Gorillaz Guard encountered an unexpected UI error.
              </p>
            </div>
            <PrimaryButton
              variant="rose"
              icon={RotateCcw}
              onClick={this.handleReload}
              className="w-full justify-center"
            >
              Reload Interface
            </PrimaryButton>
          </GlassContainer>
        </div>
      );
    }

    return this.props.children;
  }
}
