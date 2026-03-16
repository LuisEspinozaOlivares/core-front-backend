import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  /** One of the ACL/semantic CSS vars or a hex color. E.g. 'var(--acl-primary)', '#1cc88a' */
  color?: string;
  /** Show spinner instead of value while loading */
  loading?: boolean;
  /** Optional footer link label */
  footerLabel?: string;
  onFooterClick?: () => void;
}

export function StatCard({
  title,
  value,
  icon,
  color = 'var(--acl-primary)',
  loading = false,
  footerLabel,
  onFooterClick,
}: StatCardProps) {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm overflow-hidden border-l-4"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center justify-between px-6 py-5">
        <div>
          <p
            className="text-[11px] font-black uppercase tracking-widest mb-1"
            style={{ color }}
          >
            {title}
          </p>
          {loading ? (
            <div
              className="mt-2 h-7 w-7 animate-spin rounded-full border-[3px] border-transparent"
              style={{ borderTopColor: color }}
            />
          ) : (
            <p className="text-3xl font-black" style={{ color: 'var(--acl-text-dark)' }}>
              {value}
            </p>
          )}
        </div>
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${color}1A`, color }}
        >
          {icon}
        </div>
      </div>

      {footerLabel && (
        <div style={{ borderTop: '1px solid var(--acl-border)' }}>
          <button
            onClick={onFooterClick}
            className="w-full text-left px-6 py-3 text-xs font-bold flex items-center gap-1 hover:opacity-80 transition-opacity"
            style={{ color: 'var(--acl-text-muted)' }}
          >
            {footerLabel}
            <span className="ml-auto">→</span>
          </button>
        </div>
      )}
    </div>
  );
}
