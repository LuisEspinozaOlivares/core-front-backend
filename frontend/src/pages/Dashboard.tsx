import { useMemo } from 'react';
import { Building2, Users, UserCheck, Database } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { EmpresaDTO } from '../modules/empresa/dto/empresa.dto';
import { PersonaDTO } from '../modules/persona/dto/persona.dto';
import { ProfesionalDTO } from '../modules/profesional/dto/profesional.dto';

interface DashboardProps {
  personas: PersonaDTO[];
  empresas: EmpresaDTO[];
  profesionales: ProfesionalDTO[];
  totalPersonas?: number;
  totalEmpresas?: number;
  totalProfesionales?: number;
  isLoadingPersonas: boolean;
  isLoadingEmpresas: boolean;
  isLoadingProfesionales: boolean;
}

interface ActivityRow {
  entity: string;
  name: string;
  id: number;
  color: string;
}

interface DistributionItem {
  pct: number;
  color: string;
  label: string;
  count: number;
}

export default function Dashboard({
  personas,
  empresas,
  profesionales,
  totalPersonas,
  totalEmpresas,
  totalProfesionales,
  isLoadingPersonas,
  isLoadingEmpresas,
  isLoadingProfesionales,
}: DashboardProps) {
  const totalAll = (totalPersonas ?? 0) + (totalEmpresas ?? 0) + (totalProfesionales ?? 0);
  const isLoadingAny = isLoadingPersonas || isLoadingEmpresas || isLoadingProfesionales;

  // Actividad reciente: combinar los 5 más recientes (mayor ID) de las 3 entidades
  const recentActivity = useMemo((): ActivityRow[] => {
    const rows: ActivityRow[] = [
      ...personas.map((p) => ({
        entity: 'Persona',
        name: `${p.nombresPersona ?? ''} ${p.primerApellido ?? ''}`.trim() || `ID ${p.id}`,
        id: p.id ?? 0,
        color: 'var(--acl-secondary)',
      })),
      ...empresas.map((e) => ({
        entity: 'Empresa',
        name: e.nombreComercial || e.razonSocial || `ID ${e.id}`,
        id: e.id ?? 0,
        color: 'var(--acl-primary)',
      })),
      ...profesionales.map((p) => ({
        entity: 'Profesional',
        name: p.cargoNombre ? `${p.cargoNombre} (P${p.personaId})` : `Persona ID: ${p.personaId}`,
        id: p.id ?? 0,
        color: 'var(--acl-info)',
      })),
    ];
    return rows.sort((a, b) => b.id - a.id).slice(0, 5);
  }, [personas, empresas, profesionales]);

  // Distribución porcentual
  const distribution = useMemo((): DistributionItem[] | null => {
    const t = (totalPersonas ?? 0) + (totalEmpresas ?? 0) + (totalProfesionales ?? 0);
    if (t === 0) return null;
    return [
      { pct: Math.round(((totalPersonas ?? 0) / t) * 100),      color: 'var(--acl-secondary)', label: 'Personas',      count: totalPersonas ?? 0 },
      { pct: Math.round(((totalEmpresas ?? 0) / t) * 100),      color: 'var(--acl-primary)',   label: 'Empresas',      count: totalEmpresas ?? 0 },
      { pct: Math.round(((totalProfesionales ?? 0) / t) * 100), color: '#36b9cc',              label: 'Profesionales', count: totalProfesionales ?? 0 },
    ];
  }, [totalPersonas, totalEmpresas, totalProfesionales]);

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--acl-text-dark)' }}>
          Dashboard
        </h1>
        <div className="h-1 w-10 rounded-full mt-2" style={{ backgroundColor: 'var(--acl-primary)' }} />
      </div>

      {/* Fila 1 — 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Personas"
          value={totalPersonas ?? '—'}
          icon={<Users size={28} />}
          color="var(--acl-primary)"
          loading={isLoadingPersonas}
          footerLabel="Ver personas"
        />
        <StatCard
          title="Total Empresas"
          value={totalEmpresas ?? '—'}
          icon={<Building2 size={28} />}
          color="var(--acl-secondary)"
          loading={isLoadingEmpresas}
          footerLabel="Ver empresas"
        />
        <StatCard
          title="Profesionales"
          value={totalProfesionales ?? '—'}
          icon={<UserCheck size={28} />}
          color="#36b9cc"
          loading={isLoadingProfesionales}
          footerLabel="Ver profesionales"
        />
        <StatCard
          title="Total en Sistema"
          value={isLoadingAny ? '—' : totalAll}
          icon={<Database size={28} />}
          color="#1cc88a"
          loading={isLoadingAny}
        />
      </div>

      {/* Fila 2 — Actividad + Distribución */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Actividad reciente — col-span-2 */}
        <div
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm border overflow-hidden"
          style={{ borderColor: 'var(--acl-border)' }}
        >
          <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--acl-border)' }}>
            <h2 className="text-sm font-black uppercase tracking-widest" style={{ color: 'var(--acl-text-dark)' }}>
              Actividad Reciente
            </h2>
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--acl-bg-body)', color: 'var(--acl-text-muted)' }}>
              Últimos registros
            </span>
          </div>

          {isLoadingAny ? (
            <div className="flex justify-center items-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-transparent" style={{ borderTopColor: 'var(--acl-primary)' }} />
            </div>
          ) : recentActivity.length === 0 ? (
            <p className="text-center py-12 text-sm italic" style={{ color: 'var(--acl-text-muted)' }}>
              No hay registros disponibles.
            </p>
          ) : (
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: 'var(--acl-bg-body)' }}>
                  <th className="px-6 py-3 text-left text-[11px] font-black uppercase tracking-widest" style={{ color: 'var(--acl-text-muted)' }}>Entidad</th>
                  <th className="px-6 py-3 text-left text-[11px] font-black uppercase tracking-widest" style={{ color: 'var(--acl-text-muted)' }}>Nombre / Descripción</th>
                  <th className="px-6 py-3 text-left text-[11px] font-black uppercase tracking-widest" style={{ color: 'var(--acl-text-muted)' }}>Acción</th>
                  <th className="px-6 py-3 text-right text-[11px] font-black uppercase tracking-widest" style={{ color: 'var(--acl-text-muted)' }}>ID</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((row, i) => (
                  <tr
                    key={`${row.entity}-${row.id}-${i}`}
                    className="border-t transition-colors hover:bg-zinc-50/50"
                    style={{ borderColor: 'var(--acl-border)' }}
                  >
                    <td className="px-6 py-3">
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider"
                        style={{ backgroundColor: `${row.color}1A`, color: row.color }}
                      >
                        {row.entity}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm font-medium" style={{ color: 'var(--acl-text-dark)' }}>
                      {row.name}
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ backgroundColor: '#1cc88a1A', color: '#1cc88a' }}>
                        Registrado
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right text-xs font-bold" style={{ color: 'var(--acl-text-muted)' }}>
                      #{row.id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Distribución — col-span-1 */}
        <div
          className="bg-white rounded-2xl shadow-sm border overflow-hidden"
          style={{ borderColor: 'var(--acl-border)' }}
        >
          <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--acl-border)' }}>
            <h2 className="text-sm font-black uppercase tracking-widest" style={{ color: 'var(--acl-text-dark)' }}>
              Distribución
            </h2>
          </div>

          <div className="px-6 py-6 space-y-5">
            {isLoadingAny ? (
              <div className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-transparent" style={{ borderTopColor: 'var(--acl-primary)' }} />
              </div>
            ) : !distribution ? (
              <p className="text-sm italic text-center" style={{ color: 'var(--acl-text-muted)' }}>Sin datos</p>
            ) : (
              distribution.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--acl-text-dark)' }}>
                      {item.label}
                    </span>
                    <span className="text-xs font-black" style={{ color: item.color }}>
                      {item.pct}%
                    </span>
                  </div>
                  {/* Progress bar nativa — sin librerías */}
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--acl-bg-body)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                    />
                  </div>
                  <p className="text-[10px] mt-1" style={{ color: 'var(--acl-text-muted)' }}>
                    {item.count} registros
                  </p>
                </div>
              ))
            )}

            {!isLoadingAny && distribution && (
              <div className="pt-3 border-t" style={{ borderColor: 'var(--acl-border)' }}>
                <p className="text-[11px] font-black uppercase tracking-widest" style={{ color: 'var(--acl-text-muted)' }}>
                  Total en sistema
                </p>
                <p className="text-2xl font-black mt-1" style={{ color: 'var(--acl-text-dark)' }}>
                  {totalAll.toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="text-center text-xs font-bold uppercase tracking-widest py-4" style={{ color: 'var(--acl-text-muted)' }}>
        &copy; 2024 ACL Powered by DataArt — Enterprise Management System
      </footer>
    </div>
  );
}
