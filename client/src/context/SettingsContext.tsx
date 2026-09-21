import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { settingsApi } from '../lib/api';
import type { Settings } from '../lib/types';
import { useAuth } from './AuthContext';

interface SettingsState {
  settings: Settings | null;
  loading: boolean;
  reload: () => Promise<void>;
  applySettings: (next: Settings) => void;
}

const SettingsContext = createContext<SettingsState | null>(null);

/**
 * Company settings are loaded once per session and shared across the app so
 * invoices, branding and defaults always come from one source.
 */
export function SettingsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      setSettings(await settingsApi.get());
    } catch {
      // The dashboard still renders; individual pages surface their own errors.
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) void reload();
    else setSettings(null);
  }, [user, reload]);

  // Keep the UI accent in sync with the configured brand colour.
  useEffect(() => {
    const color = settings?.primaryColor;
    if (color) document.documentElement.style.setProperty('--wm-brand', color);
  }, [settings?.primaryColor]);

  const value = useMemo(
    () => ({ settings, loading, reload, applySettings: setSettings }),
    [settings, loading, reload]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside <SettingsProvider>');
  return ctx;
}
