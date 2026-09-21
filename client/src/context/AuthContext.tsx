import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { authApi, setUnauthorizedHandler, tokenStore } from '../lib/api';
import type { AuthUser } from '../lib/types';

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  needsSetup: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshSetupState: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsSetup, setNeedsSetup] = useState(false);

  const refreshSetupState = useCallback(async () => {
    try {
      const { needsSetup: value } = await authApi.status();
      setNeedsSetup(value);
    } catch {
      setNeedsSetup(false);
    }
  }, []);

  // Restore the session on first load.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const token = tokenStore.get();
      if (token) {
        try {
          const me = await authApi.me();
          if (!cancelled) setUser(me);
        } catch {
          tokenStore.clear();
        }
      }
      if (!cancelled) {
        await refreshSetupState();
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [refreshSetupState]);

  // Any 401 from the API drops the session immediately.
  useEffect(() => {
    setUnauthorizedHandler(() => setUser(null));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { token, user: loggedIn } = await authApi.login(email, password);
    tokenStore.set(token);
    setUser(loggedIn);
    setNeedsSetup(false);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const { token, user: created } = await authApi.register(name, email, password);
    tokenStore.set(token);
    setUser(created);
    setNeedsSetup(false);
  }, []);

  const logout = useCallback(() => {
    tokenStore.clear();
    setUser(null);
    void refreshSetupState();
  }, [refreshSetupState]);

  const value = useMemo(
    () => ({ user, loading, needsSetup, login, register, logout, refreshSetupState }),
    [user, loading, needsSetup, login, register, logout, refreshSetupState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
