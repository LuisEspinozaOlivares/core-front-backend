import { useState, useMemo } from 'react';
import { Search, X, Plus } from 'lucide-react';
import { PersonaTable } from './PersonaTable';
import { PersonaDTO } from '../dto/persona.dto';
import { Pagination } from '../../../components/Pagination';

interface PersonaPageProps {
  personas: PersonaDTO[];
  isLoading: boolean;
  onEdit: (persona: PersonaDTO) => void;
  onDelete: (id: number) => void;
  onNew: () => void;
}

type FilterActive = 'all' | 'true' | 'false';

export function PersonaPage({ personas, isLoading, onEdit, onDelete, onNew }: PersonaPageProps) {
  const [search, setSearch] = useState('');
  const [filterActive, setFilterActive] = useState<FilterActive>('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    let result = personas;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          (p.nombresPersona || '').toLowerCase().includes(q) ||
          (p.primerApellido || '').toLowerCase().includes(q) ||
          (p.segundoApellido || '').toLowerCase().includes(q) ||
          (p.numeroIdentificacion || '').toLowerCase().includes(q)
      );
    }

    if (filterActive !== 'all') {
      result = result.filter((p) => String(p.active) === filterActive);
    }

    return result;
  }, [personas, search, filterActive]);

  const handleSearch = (v: string) => { setSearch(v); setPage(1); };
  const handleFilter = (v: FilterActive) => { setFilterActive(v); setPage(1); };
  const handlePageSize = (v: number) => { setPageSize(v); setPage(1); };

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black" style={{ color: 'var(--acl-text-dark)' }}>
            Listado de Personas
          </h2>
          <p className="text-sm mt-0.5" style={{ color: 'var(--acl-text-muted)' }}>
            {filtered.length} registro{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={onNew}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black text-white uppercase tracking-wider transition-all shadow-sm"
          style={{ backgroundColor: 'var(--acl-primary)' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--acl-primary-dark)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--acl-primary)')}
        >
          <Plus size={16} /> Nueva Persona
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--acl-text-muted)' }}
          />
          <input
            type="text"
            placeholder="Buscar personas..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 text-sm border rounded-xl outline-none transition-all"
            style={{ borderColor: 'var(--acl-border)', backgroundColor: 'var(--acl-bg-body)', color: 'var(--acl-text-dark)' }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--acl-primary)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--acl-search-focus-ring)'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--acl-border)'; e.currentTarget.style.boxShadow = 'none'; }}
          />
          {search && (
            <button
              onClick={() => handleSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded hover:opacity-70 transition-opacity"
              style={{ color: 'var(--acl-text-muted)' }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        <select
          value={filterActive}
          onChange={(e) => handleFilter(e.target.value as FilterActive)}
          className="px-3 py-2.5 text-sm border rounded-xl outline-none transition-all"
          style={{ borderColor: 'var(--acl-border)', backgroundColor: 'var(--acl-bg-body)', color: 'var(--acl-text-dark)' }}
        >
          <option value="all">Todos los estados</option>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      </div>

      {/* Table */}
      <PersonaTable
        personas={paginated}
        onEdit={onEdit}
        onDelete={onDelete}
        isLoading={isLoading}
      />

      {/* Pagination */}
      {!isLoading && filtered.length > 0 && (
        <Pagination
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={handlePageSize}
        />
      )}
    </div>
  );
}
