/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { Layout } from './components/Layout';
import type { SidebarPage } from './components/Sidebar';

// Páginas
import Dashboard from './pages/Dashboard';
import { EmpresaPage } from './modules/empresa/components/EmpresaPage';
import { PersonaPage } from './modules/persona/components/PersonaPage';
import { ProfesionalPage } from './modules/profesional/components/ProfesionalPage';

// Formularios
import { EmpresaForm } from './modules/empresa/components/EmpresaForm';
import { EmpresaDTO } from './modules/empresa/dto/empresa.dto';
import { empresaService } from './modules/empresa/services/empresa.service';

import { PersonaForm } from './modules/persona/components/PersonaForm';
import { PersonaDTO } from './modules/persona/dto/persona.dto';
import { personaService } from './modules/persona/services/persona.service';

import { ProfesionalForm } from './modules/profesional/components/ProfesionalForm';
import { ProfesionalDTO } from './modules/profesional/dto/profesional.dto';
import { profesionalService } from './modules/profesional/services/profesional.service';

export default function App() {
  const queryClient = useQueryClient();
  // Dashboard es la página por defecto
  const [activeTab, setActiveTab] = useState<SidebarPage>('dashboard');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMutationLoading, setIsMutationLoading] = useState(false);

  // Consultas con TanStack Query
  const { data: empresasData, isLoading: isLoadingEmpresas } = useQuery({
    queryKey: ['empresas'],
    queryFn: () => empresaService.getAll({ page: 1, limit: 100 }),
  });

  const { data: personasData, isLoading: isLoadingPersonas } = useQuery({
    queryKey: ['personas'],
    queryFn: () => personaService.getAll({ page: 1, limit: 100 }),
  });

  const { data: profesionalesData, isLoading: isLoadingProfesionales } = useQuery({
    queryKey: ['profesionales'],
    queryFn: () => profesionalService.getAll({ page: 1, limit: 100 }),
  });

  const isLoading = isLoadingEmpresas || isLoadingPersonas || isLoadingProfesionales;

  // Arreglos de datos
  const empresas = empresasData?.data || [];
  const personas = personasData?.data || [];
  const profesionales = profesionalesData?.data || [];

  // Estados para edición
  const [selectedEmpresa, setSelectedEmpresa] = useState<EmpresaDTO | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<PersonaDTO | null>(null);
  const [selectedProfesional, setSelectedProfesional] = useState<ProfesionalDTO | null>(null);

  const handleOpenCreate = () => {
    setSelectedEmpresa(null);
    setSelectedPersona(null);
    setSelectedProfesional(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedEmpresa(null);
    setSelectedPersona(null);
    setSelectedProfesional(null);
  };

  const handleFormSubmit = async (data: any) => {
    setIsMutationLoading(true);
    try {
      if (activeTab === 'personas') {
        if (selectedPersona?.id) {
          await personaService.update(selectedPersona.id, data);
        } else {
          const persona = await personaService.create(data);
          const personaId = persona.id!;

          if (data.email || data.telefono) {
            await personaService.saveContacto({
              personaId,
              tipoContactoId: 1,
              ambitoContactoId: 1,
              valor: data.email || data.telefono,
              principal: true,
              activo: true,
            });
          }

          if (data.calle || data.numero) {
            await personaService.saveDireccion({
              personaId,
              tipoDireccionId: 1,
              calle: data.calle,
              numero: data.numero,
              localidadId: data.localidadId || 1,
            });
          }
        }
        queryClient.invalidateQueries({ queryKey: ['personas'] });

      } else if (activeTab === 'empresas') {
        if (selectedEmpresa?.id) {
          await empresaService.update(selectedEmpresa.id, data);
        } else {
          await empresaService.create(data);
        }
        queryClient.invalidateQueries({ queryKey: ['empresas'] });

      } else if (activeTab === 'profesionales') {
        if (selectedProfesional?.id) {
          await profesionalService.update(selectedProfesional.id, data);
        } else {
          await profesionalService.create(data);
        }
        queryClient.invalidateQueries({ queryKey: ['profesionales'] });
      }

      alert(`¡Registro guardado con éxito!\n\nEl sistema ha procesado la información correctamente.`);
      handleCloseForm();
    } catch (error: any) {
      console.error('Error al guardar:', error);
      const errorMsg = error.response?.data?.message || 'Error inesperado al procesar la solicitud.';
      alert(`Error: ${errorMsg}`);
    } finally {
      setIsMutationLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(`¿Estás seguro de eliminar este registro (ID ${id})?`)) return;
    try {
      if (activeTab === 'empresas') {
        await empresaService.delete(id);
        queryClient.invalidateQueries({ queryKey: ['empresas'] });
      } else if (activeTab === 'personas') {
        await personaService.delete(id);
        queryClient.invalidateQueries({ queryKey: ['personas'] });
      } else if (activeTab === 'profesionales') {
        await profesionalService.delete(id);
        queryClient.invalidateQueries({ queryKey: ['profesionales'] });
      }
      alert(`Registro eliminado correctamente.`);
    } catch (error: any) {
      console.error('Error al eliminar:', error);
      const errorMsg = error.response?.data?.message || 'Error inesperado al eliminar el registro.';
      alert(`Error: ${errorMsg}`);
    }
  };

  return (
    <Layout activePage={activeTab} onNavigate={setActiveTab}>

      {/* Dashboard */}
      {activeTab === 'dashboard' && (
        <Dashboard
          personas={personas}
          empresas={empresas}
          profesionales={profesionales}
          totalPersonas={personasData?.total}
          totalEmpresas={empresasData?.total}
          totalProfesionales={profesionalesData?.total}
          isLoadingPersonas={isLoadingPersonas}
          isLoadingEmpresas={isLoadingEmpresas}
          isLoadingProfesionales={isLoadingProfesionales}
        />
      )}

      {/* Empresas */}
      {activeTab === 'empresas' && (
        <EmpresaPage
          empresas={empresas}
          isLoading={isLoadingEmpresas}
          onEdit={(e) => { setSelectedEmpresa(e); setIsFormOpen(true); }}
          onDelete={handleDelete}
          onNew={handleOpenCreate}
        />
      )}

      {/* Personas */}
      {activeTab === 'personas' && (
        <PersonaPage
          personas={personas}
          isLoading={isLoadingPersonas}
          onEdit={(p) => { setSelectedPersona(p); setIsFormOpen(true); }}
          onDelete={handleDelete}
          onNew={handleOpenCreate}
        />
      )}

      {/* Profesionales */}
      {activeTab === 'profesionales' && (
        <ProfesionalPage
          profesionales={profesionales}
          isLoading={isLoadingProfesionales}
          onEdit={(p) => { setSelectedProfesional(p); setIsFormOpen(true); }}
          onDelete={handleDelete}
          onNew={handleOpenCreate}
          personas={personas}
          empresas={empresas}
        />
      )}

      {/* Modal de formulario */}
      {isFormOpen && (
        <div
          className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-6"
          style={{ backgroundColor: 'rgba(26,26,26,0.6)' }}
        >
          <div
            className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border-l-[12px]"
            style={{ borderLeftColor: 'var(--acl-primary)' }}
          >
            <div
              className="sticky top-0 bg-white px-10 py-6 border-b flex justify-between items-center z-10"
              style={{ borderBottomColor: 'var(--acl-border)' }}
            >
              <div>
                <h2 className="text-2xl font-black tracking-tight" style={{ color: 'var(--acl-text-dark)' }}>
                  {activeTab === 'empresas'
                    ? (selectedEmpresa ? 'Editar Empresa' : 'Nueva Empresa')
                    : activeTab === 'personas'
                    ? (selectedPersona ? 'Editar Persona' : 'Nueva Persona')
                    : (selectedProfesional ? 'Editar Profesional' : 'Nuevo Profesional')}
                </h2>
                <p className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--acl-text-muted)' }}>
                  Formulario de Registro CORE
                </p>
              </div>
              <button
                onClick={handleCloseForm}
                className="p-3 rounded-2xl transition-colors"
                style={{ color: 'var(--acl-text-muted)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--acl-primary)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--acl-bg-body)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--acl-text-muted)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                }}
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4">
              {activeTab === 'empresas' && (
                <EmpresaForm
                  initialData={selectedEmpresa || {}}
                  onSubmit={handleFormSubmit}
                  onCancel={handleCloseForm}
                  isLoading={isLoading}
                />
              )}
              {activeTab === 'personas' && (
                <PersonaForm
                  initialData={selectedPersona || {}}
                  onSubmit={handleFormSubmit}
                  onCancel={handleCloseForm}
                  isLoading={isLoading}
                />
              )}
              {activeTab === 'profesionales' && (
                <ProfesionalForm
                  initialData={selectedProfesional || {}}
                  onSubmit={handleFormSubmit}
                  onCancel={handleCloseForm}
                  personas={personas}
                  empresas={empresas}
                  isLoading={isMutationLoading}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
