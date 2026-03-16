import { useEffect, type ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Envuelve cualquier contenido que requiera autenticación.
 * - Mientras carga → spinner
 * - Sin sesión → llama login() (redirige a Authentik) + spinner
 * - Con sesión → renderiza los hijos normalmente
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading, login } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Redirige al flujo PKCE de Authentik
      login();
    }
  }, [loading, isAuthenticated]);

  if (loading || !isAuthenticated) {
    return <AuthSpinner label={loading ? 'Verificando sesión...' : 'Redirigiendo a Authentik...'} />;
  }

  return <>{children}</>;
}

// ─── Spinner de pantalla completa ─────────────────────────────────────────────

function AuthSpinner({ label }: { label: string }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{ backgroundColor: 'var(--acl-bg-body)' }}
    >
      {/* Logo / brand mark */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
        style={{ background: 'var(--acl-sidebar-gradient)' }}
      >
        <span className="text-white text-2xl font-black">A</span>
      </div>

      {/* Spinner */}
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-transparent"
        style={{ borderTopColor: 'var(--acl-primary)' }}
      />

      {/* Label */}
      <p
        className="text-xs font-black uppercase tracking-widest"
        style={{ color: 'var(--acl-text-muted)' }}
      >
        {label}
      </p>
    </div>
  );
}
