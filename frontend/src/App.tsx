/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Building2, Users, Briefcase, X, LayoutDashboard, UserCheck } from 'lucide-react';
import logo from './assets/logo-500w.png';

// Módulos
import { EmpresaTable } from './modules/empresa/components/EmpresaTable';
import { EmpresaForm } from './modules/empresa/components/EmpresaForm';
import { EmpresaDTO } from './modules/empresa/dto/empresa.dto';
import { empresaService } from './modules/empresa/services/empresa.service';

import { PersonaTable } from './modules/persona/components/PersonaTable';
import { PersonaForm } from './modules/persona/components/PersonaForm';
import { PersonaDTO } from './modules/persona/dto/persona.dto';
import { personaService } from './modules/persona/services/persona.service';

import { ProfesionalTable } from './modules/profesional/components/ProfesionalTable';
import { ProfesionalForm } from './modules/profesional/components/ProfesionalForm';
import { ProfesionalDTO } from './modules/profesional/dto/profesional.dto';
import { profesionalService } from './modules/profesional/services/profesional.service';

// --- MOCK DATA REMOVED ---

type TabType = 'empresas' | 'personas' | 'profesionales';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('personas');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMutationLoading, setIsMutationLoading] = useState(false);

  // Consultas con TanStack Query
  const { data: empresasData, isLoading: isLoadingEmpresas } = useQuery({
    queryKey: ['empresas'],
    queryFn: () => empresaService.getAll({ page: 1, limit: 100 })
  });

  const { data: personasData, isLoading: isLoadingPersonas } = useQuery({
    queryKey: ['personas'],
    queryFn: () => personaService.getAll({ page: 1, limit: 100 })
  });

  const { data: profesionalesData, isLoading: isLoadingProfesionales } = useQuery({
    queryKey: ['profesionales'],
    queryFn: () => profesionalService.getAll({ page: 1, limit: 100 })
  });

  const isLoading = isLoadingEmpresas || isLoadingPersonas || isLoadingProfesionales;

  // Extraer arreglos de datos
  const empresas = empresasData?.data || [];
  const personas = personasData?.data || [];
  console.log(personas);
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
        // 1. Crear Persona
        const persona = await personaService.create(data);
        const personaId = persona.id!;

        // 2. Guardar Contacto si existe
        if (data.email || data.telefono) {
          await personaService.saveContacto({
            personaId: personaId,
            tipoContactoId: 1, // Asumiendo 1 para Email/Teléfono general
            ambitoContactoId: 1,
            valorContacto: data.email || data.telefono,
            principal: true,
            activo: true
          });
        }

        // 3. Guardar Dirección si existe
        if (data.calle || data.numero) {
          await personaService.saveDireccion({
            personaId: personaId,
            tipoDireccionId: 1,
            calle: data.calle,
            numero: data.numero,
            localidadId: data.localidadId || 1
          });
        }
      } else {
        console.log(`Simulando envío al Backend (${activeTab}):`, JSON.stringify(data, null, 2));
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

  const handleDelete = (id: number) => {
    if (confirm(`¿Estás seguro de eliminar este registro (ID ${id})?`)) {
      console.log(`Eliminando ${activeTab} ID:`, id);
      alert(`Registro eliminado correctamente.`);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">

      {/* Sidebar ACL Style */}
      <aside className="w-64 bg-gradient-to-b from-[#E31D4A] to-[#5135A1] text-white flex flex-col shadow-xl fixed h-full z-20">
        <div className="p-8 flex flex-col items-center border-b border-white/10">
          <div className="bg-white p-4 rounded-xl mb-4 shadow-lg flex items-center justify-center">
            <img src={logo} alt="ACL Logo" className="h-10 object-contain" referrerPolicy="no-referrer" />
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold tracking-tight">Gestión CORE</h2>
            <p className="text-white/60 text-[10px] uppercase font-bold tracking-widest mt-1">Powered by DataArt</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button
            onClick={() => setActiveTab('empresas')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'empresas' ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'
              }`}
          >
            <Building2 size={20} /> Empresas
          </button>
          <button
            onClick={() => setActiveTab('personas')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'personas' ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'
              }`}
          >
            <Users size={20} /> Personas
          </button>
          <button
            onClick={() => setActiveTab('profesionales')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'profesionales' ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'
              }`}
          >
            <UserCheck size={20} /> Profesionales
          </button>
        </nav>

        <div className="p-6 border-t border-white/10">
          <div className="bg-white/10 p-4 rounded-2xl">
            <p className="text-[10px] text-white/50 uppercase font-bold mb-1">Usuario Activo</p>
            <p className="text-sm font-bold">Admin ACL</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10">
        <div className="max-w-6xl mx-auto space-y-10">

          {/* Header Section */}
          <header className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-black text-[#1A1A1A] tracking-tight capitalize">
                {activeTab}
              </h1>
              <div className="h-1 w-12 bg-[#E31D4A] mt-2 rounded-full"></div>
            </div>
            <button
              onClick={handleOpenCreate}
              className="bg-[#E31D4A] text-white px-8 py-3 rounded-2xl text-sm font-black hover:bg-[#C2183F] transition-all shadow-lg shadow-[#E31D4A]/20 flex items-center gap-2 uppercase tracking-wider"
            >
              Nuevo Registro
            </button>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-[#E31D4A] flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-[#E31D4A]/5 flex items-center justify-center text-[#E31D4A]">
                <Building2 size={28} />
              </div>
              <div>
                <div className="text-3xl font-black text-[#1A1A1A]">{empresas.length}</div>
                <div className="text-[10px] text-[#8E8E8E] uppercase font-black tracking-widest">Empresas Registradas</div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-[#5135A1] flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-[#5135A1]/5 flex items-center justify-center text-[#5135A1]">
                <Users size={28} />
              </div>
              <div>
                <div className="text-3xl font-black text-[#1A1A1A]">{personas.length}</div>
                <div className="text-[10px] text-[#8E8E8E] uppercase font-black tracking-widest">Personas en Base</div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-[#E31D4A] flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-[#E31D4A]/5 flex items-center justify-center text-[#E31D4A]">
                <Briefcase size={28} />
              </div>
              <div>
                <div className="text-3xl font-black text-[#1A1A1A]">{profesionales.length}</div>
                <div className="text-[10px] text-[#8E8E8E] uppercase font-black tracking-widest">Profesionales Activos</div>
              </div>
            </div>
          </div>

          {/* Content Area with Fuchsia Accent */}
          <section className="bg-white rounded-2xl shadow-xl border border-black/5 overflow-hidden border-l-4 border-[#E31D4A]">
            <div className="p-8">
              {activeTab === 'empresas' && (
                <EmpresaTable
                  empresas={empresas}
                  onEdit={(e) => { setSelectedEmpresa(e); setIsFormOpen(true); }}
                  onDelete={handleDelete}
                  isLoading={isLoadingEmpresas}
                />
              )}
              {activeTab === 'personas' && (
                <PersonaTable
                  personas={personas}
                  onEdit={(p) => { setSelectedPersona(p); setIsFormOpen(true); }}
                  onDelete={handleDelete}
                  isLoading={isLoadingPersonas}
                />
              )}
              {activeTab === 'profesionales' && (
                <ProfesionalTable
                  profesionales={profesionales}
                  onEdit={(p) => { setSelectedProfesional(p); setIsFormOpen(true); }}
                  onDelete={handleDelete}
                  isLoading={isLoadingProfesionales}
                />
              )}
            </div>
          </section>

          <footer className="pt-10 text-center text-[#8E8E8E] text-xs font-bold uppercase tracking-widest">
            &copy; 2024 ACL Powered by DataArt - Enterprise Management System
          </footer>
        </div>
      </main>

      {/* Modal ACL Style */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-300 border-l-[12px] border-[#E31D4A]">
            <div className="sticky top-0 bg-white px-10 py-6 border-b flex justify-between items-center z-10">
              <div>
                <h2 className="text-2xl font-black text-[#1A1A1A] tracking-tight">
                  {activeTab === 'empresas' ? (selectedEmpresa ? 'Editar Empresa' : 'Nueva Empresa') :
                    activeTab === 'personas' ? (selectedPersona ? 'Editar Persona' : 'Nueva Persona') :
                      (selectedProfesional ? 'Editar Profesional' : 'Nuevo Profesional')}
                </h2>
                <p className="text-xs text-[#8E8E8E] font-bold uppercase tracking-widest mt-1">Formulario de Registro CORE</p>
              </div>
              <button
                onClick={handleCloseForm}
                className="p-3 hover:bg-[#F8F9FC] rounded-2xl transition-colors text-[#8E8E8E] hover:text-[#E31D4A]"
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
    </div>
  );
}
