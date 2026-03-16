import { useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  Users,
  UserCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import logo from '../assets/logo-500w.png';

export type SidebarPage = 'dashboard' | 'empresas' | 'personas' | 'profesionales';

interface NavItem {
  id: SidebarPage;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard',     label: 'Dashboard',     icon: <LayoutDashboard size={18} /> },
  { id: 'empresas',      label: 'Empresas',      icon: <Building2       size={18} /> },
  { id: 'personas',      label: 'Personas',      icon: <Users           size={18} /> },
  { id: 'profesionales', label: 'Profesionales', icon: <UserCheck       size={18} /> },
];

interface SidebarProps {
  activePage: SidebarPage;
  onNavigate: (page: SidebarPage) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({ activePage, onNavigate, collapsed = false, onToggleCollapse }: SidebarProps) {
  return (
    <aside
      style={{
        backgroundColor: 'var(--acl-sidebar-bg)',
        width: collapsed ? '4.5rem' : '16rem',
      }}
      className="fixed left-0 top-0 h-full flex flex-col shadow-xl z-30 transition-all duration-300"
    >
      {/* Brand */}
      <div
        className="flex items-center gap-3 px-4 py-5 border-b"
        style={{ borderColor: 'var(--acl-sidebar-border)' }}
      >
        <div
          className="h-9 w-9 flex-shrink-0 rounded-lg flex items-center justify-center overflow-hidden shadow"
          style={{ background: 'var(--acl-sidebar-gradient)' }}
        >
          <img src={logo} alt="ACL" className="h-6 object-contain" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-white text-sm font-black tracking-tight leading-none">Gestión CORE</p>
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--acl-sidebar-text)' }}>
              Powered by DataArt
            </p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left"
              style={{
                backgroundColor: isActive ? 'var(--acl-sidebar-active)' : 'transparent',
                color: isActive ? '#fff' : 'var(--acl-sidebar-text)',
              }}
              title={collapsed ? item.label : undefined}
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--acl-sidebar-hover)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              }}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="px-2 pb-4">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all"
          style={{ color: 'var(--acl-sidebar-text)', backgroundColor: 'var(--acl-sidebar-hover)' }}
        >
          {collapsed
            ? <ChevronRight size={16} />
            : <><ChevronLeft size={16} /><span>Colapsar</span></>
          }
        </button>
      </div>

      {/* User badge */}
      {!collapsed && (
        <div
          className="mx-3 mb-4 p-3 rounded-xl border"
          style={{ borderColor: 'var(--acl-sidebar-border)', backgroundColor: 'rgba(255,255,255,0.05)' }}
        >
          <p className="text-[10px] uppercase font-black tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Usuario Activo
          </p>
          <p className="text-white text-sm font-bold mt-0.5">Admin ACL</p>
        </div>
      )}
    </aside>
  );
}
