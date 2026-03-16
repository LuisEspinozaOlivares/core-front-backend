import { useState } from 'react';
import { Search, Bell, User, ChevronDown, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface TopbarProps {
  sidebarWidth?: string;
}

export function Topbar({ sidebarWidth = '16rem' }: TopbarProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  // Iniciales para el avatar (máx 2 chars)
  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    : 'U';

  const displayName = user?.name ?? 'Usuario';
  const displayRole = user?.roles?.[0] ?? 'Usuario';

  return (
    <header
      className="fixed top-0 right-0 z-20 flex items-center justify-between px-6 py-3 shadow-sm transition-all duration-300"
      style={{
        left: sidebarWidth,
        backgroundColor: 'var(--acl-topbar-bg)',
        borderBottom: '1px solid var(--acl-topbar-border)',
      }}
    >
      {/* Search */}
      <form className="flex items-center gap-2 relative" onSubmit={(e) => e.preventDefault()}>
        <input
          type="search"
          placeholder="Buscar..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="w-64 text-sm rounded-full pl-4 pr-10 py-2 border outline-none transition-all duration-200"
          style={{
            borderColor: searchFocused ? 'var(--acl-search-border-focus)' : 'var(--acl-border)',
            boxShadow: searchFocused ? `0 0 0 3px var(--acl-search-focus-ring)` : 'none',
            color: 'var(--acl-text-dark)',
            backgroundColor: 'var(--acl-bg-body)',
          }}
        />
        <Search
          size={15}
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: 'var(--acl-text-muted)' }}
        />
      </form>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button
          className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
          style={{ color: 'var(--acl-text-muted)' }}
          title="Notificaciones"
        >
          <Bell size={18} />
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: 'var(--acl-primary)' }}
          />
        </button>

        {/* Divider */}
        <div className="h-6 w-px" style={{ backgroundColor: 'var(--acl-border)' }} />

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
            style={{ color: 'var(--acl-text-dark)' }}
          >
            {/* Avatar con iniciales */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0"
              style={{ background: 'var(--acl-sidebar-gradient)' }}
            >
              {initials}
            </div>

            {/* Nombre y rol — ocultos en pantallas muy pequeñas */}
            <div className="hidden sm:flex flex-col items-start leading-tight max-w-[140px]">
              <span
                className="font-black text-[13px] truncate w-full"
                style={{ color: 'var(--acl-text-dark)' }}
                title={displayName}
              >
                {displayName}
              </span>
              <span
                className="text-[10px] font-bold uppercase tracking-widest truncate w-full"
                style={{ color: 'var(--acl-text-muted)' }}
                title={displayRole}
              >
                {displayRole}
              </span>
            </div>

            <ChevronDown size={14} style={{ color: 'var(--acl-text-muted)' }} />
          </button>

          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-52 rounded-xl shadow-lg border overflow-hidden"
              style={{
                backgroundColor: 'var(--acl-bg-white)',
                borderColor: 'var(--acl-border)',
              }}
            >
              {/* User info header */}
              <div
                className="px-4 py-3 border-b"
                style={{ borderColor: 'var(--acl-border)', backgroundColor: 'var(--acl-bg-body)' }}
              >
                <p
                  className="text-xs font-black truncate"
                  style={{ color: 'var(--acl-text-dark)' }}
                >
                  {displayName}
                </p>
                <p
                  className="text-[10px] truncate mt-0.5"
                  style={{ color: 'var(--acl-text-muted)' }}
                >
                  {user?.email ?? ''}
                </p>
              </div>

              <button
                className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                style={{ color: 'var(--acl-text-dark)' }}
                onClick={() => setDropdownOpen(false)}
              >
                <User size={14} style={{ color: 'var(--acl-text-muted)' }} />
                Perfil
              </button>
              <button
                className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                style={{ color: 'var(--acl-text-dark)' }}
                onClick={() => setDropdownOpen(false)}
              >
                <Settings size={14} style={{ color: 'var(--acl-text-muted)' }} />
                Configuración
              </button>

              <div style={{ borderTop: '1px solid var(--acl-border)' }} />

              <button
                className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-red-50 transition-colors"
                style={{ color: 'var(--acl-primary)' }}
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                }}
              >
                <LogOut size={14} />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
