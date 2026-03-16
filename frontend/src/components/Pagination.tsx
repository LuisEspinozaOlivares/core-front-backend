import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const PAGE_SIZES = [10, 25, 50];

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function Pagination({ page, pageSize, total, onPageChange, onPageSizeChange }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  const getPageNums = (): (number | 'ellipsis-left' | 'ellipsis-right')[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    const nums: (number | 'ellipsis-left' | 'ellipsis-right')[] = [1];
    if (start > 2) nums.push('ellipsis-left');
    for (let i = start; i <= end; i++) nums.push(i);
    if (end < totalPages - 1) nums.push('ellipsis-right');
    nums.push(totalPages);
    return nums;
  };

  const btnBase =
    'min-w-[2rem] h-8 px-2 rounded-lg text-sm font-semibold flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
      {/* Info + page size */}
      <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--acl-text-muted)' }}>
        <span>
          Mostrando <span className="font-bold" style={{ color: 'var(--acl-text-dark)' }}>{from}–{to}</span> de{' '}
          <span className="font-bold" style={{ color: 'var(--acl-text-dark)' }}>{total}</span> registros
        </span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="px-2 py-1 text-xs border rounded-lg outline-none"
          style={{ borderColor: 'var(--acl-border)', color: 'var(--acl-text-dark)', backgroundColor: 'var(--acl-bg-body)' }}
        >
          {PAGE_SIZES.map((s) => (
            <option key={s} value={s}>{s} por página</option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-1">
        <button
          className={btnBase}
          onClick={() => onPageChange(1)}
          disabled={page === 1}
          style={{ color: 'var(--acl-text-muted)' }}
          title="Primera página"
        >
          <ChevronsLeft size={15} />
        </button>
        <button
          className={btnBase}
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          style={{ color: 'var(--acl-text-muted)' }}
          title="Anterior"
        >
          <ChevronLeft size={15} />
        </button>

        {getPageNums().map((n, i) =>
          typeof n === 'string' ? (
            <span key={n} className="px-1 text-sm" style={{ color: 'var(--acl-text-muted)' }}>…</span>
          ) : (
            <button
              key={n}
              className={btnBase}
              onClick={() => onPageChange(n)}
              style={
                n === page
                  ? { backgroundColor: 'var(--acl-primary)', color: '#fff' }
                  : { color: 'var(--acl-text-dark)' }
              }
            >
              {n}
            </button>
          )
        )}

        <button
          className={btnBase}
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          style={{ color: 'var(--acl-text-muted)' }}
          title="Siguiente"
        >
          <ChevronRight size={15} />
        </button>
        <button
          className={btnBase}
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
          style={{ color: 'var(--acl-text-muted)' }}
          title="Última página"
        >
          <ChevronsRight size={15} />
        </button>
      </div>
    </div>
  );
}
