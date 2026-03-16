import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { authService, type UserInfo } from '../services/authService';

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface AuthContextValue {
  user: UserInfo | null;
  isAuthenticated: boolean;
  /** true mientras se procesa el callback o se verifica la sesión inicial */
  loading: boolean;
  login: () => Promise<void>;
  logout: () => void;
  roles: string[];
}

// ─── Contexto ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        if (window.location.search.includes('code=')) {
          // Callback de Authentik — intercambia code por tokens
          const userInfo = await authService.handleCallback();
          setUser(userInfo);
        } else {
          // Verificar sesión existente en sessionStorage
          const existing = authService.getUser();
          if (existing && authService.isAuthenticated()) {
            setUser(existing);
          }
        }
      } catch (err) {
        console.error('[Auth] Error en inicialización:', err);
        // El error puede ser el segundo mount de React StrictMode (verifier ya consumido).
        // En ese caso el token ya fue guardado por el primer mount — intentar recuperarlo.
        const existing = authService.getUser();
        if (existing && authService.isAuthenticated()) {
          setUser(existing);
        }
        // Si tampoco hay sesión, ProtectedRoute enviará al login.
      } finally {
        setLoading(false);
      }
    };

    init();
    // Solo al montar — no hay deps externas que cambien
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && authService.isAuthenticated(),
        loading,
        login: authService.login.bind(authService),
        logout: authService.logout.bind(authService),
        roles: user?.roles ?? [],
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth() debe usarse dentro de <AuthProvider>');
  return ctx;
}
