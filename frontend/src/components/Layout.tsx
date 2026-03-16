import { useState, type ReactNode } from 'react';
import { Sidebar, type SidebarPage } from './Sidebar';
import { Topbar } from './Topbar';

interface LayoutProps {
  activePage: SidebarPage;
  onNavigate: (page: SidebarPage) => void;
  children: ReactNode;
}

export function Layout({ activePage, onNavigate, children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? '4.5rem' : '16rem';

  return (
    <div style={{ backgroundColor: 'var(--acl-bg-body)' }} className="min-h-screen font-sans">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
      />

      <Topbar sidebarWidth={sidebarWidth} />

      {/* Page content — offset by sidebar width and topbar height (~57px) */}
      <main
        className="transition-all duration-300 pt-16"
        style={{ marginLeft: sidebarWidth }}
      >
        <div className="p-8 max-w-screen-xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
