import { useState, useEffect, useCallback } from 'react';
import { analyticsService } from '../services/security/analytics';

/**
 * Custom React Hook for Security Dashboard State & Data Fetching
 * Isolates all business logic, data filtering, and metrics calculation from UI components
 */
export function useDashboardData() {
  const [metrics, setMetrics] = useState(null);
  const [historyList, setHistoryList] = useState([]);
  const [whitelist, setWhitelist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'history' | 'websites' | 'tips' | 'settings'
  const [historyFilter, setHistoryFilter] = useState('all'); // 'all' | 'safe' | 'risky'

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await analyticsService.getMetrics();
      setMetrics(data);
      setHistoryList(data.history || []);
      setWhitelist(data.whitelist || []);
    } catch (err) {
      console.error('Failed to load dashboard metrics:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Derived filtered data
  const safeWebsites = historyList.filter((h) => h.safetyLevel === 'SAFE');
  const unsafeWebsites = historyList.filter((h) => h.safetyLevel !== 'SAFE');

  const filteredHistory = historyList.filter((item) => {
    if (historyFilter === 'safe') return item.safetyLevel === 'SAFE';
    if (historyFilter === 'risky') return item.safetyLevel !== 'SAFE';
    return true;
  });

  const handleAddWhitelist = async (domain) => {
    if (!domain) return;
    const updated = await analyticsService.addToWhitelist(domain);
    setWhitelist(updated);
  };

  const handleRemoveWhitelist = async (domain) => {
    const updated = await analyticsService.removeFromWhitelist(domain);
    setWhitelist(updated);
  };

  return {
    metrics,
    historyList,
    filteredHistory,
    safeWebsites,
    unsafeWebsites,
    whitelist,
    isLoading,
    activeTab,
    historyFilter,
    setActiveTab,
    setHistoryFilter,
    handleAddWhitelist,
    handleRemoveWhitelist,
    refreshData: fetchDashboardData,
  };
}
