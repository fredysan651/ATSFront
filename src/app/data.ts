// Importa los tipos Candidate y Job (solo tipos — se eliminan en la compilación a JS)
import type { Candidate, Job } from './models';

// Array con los 6 valores válidos de estado de candidato (usado para filtros y selects)
export const CANDIDATE_STATUSES: Candidate['status'][] = [
  'nuevo',        // Candidato recién registrado
  'en_revision',  // Siendo revisado
  'entrevista',   // En entrevista
  'ofrecido',     // Con oferta
  'contratado',   // Contratado
  'rechazado',    // Descartado
];

// Array con los 3 valores válidos de estado de vacante
export const JOB_STATUSES: Job['status'][] = ['abierta', 'cerrada', 'pausada'];

// Lista de candidatos hardcodeada con datos de ejemplo para la demostración
export const CANDIDATES: Candidate[] = [
  {
    id: 1,                          // Identificador único
    name: 'María González',         // Nombre completo
    email: 'maria.gonzalez@email.com', // Correo de contacto
    jobTitle: 'Desarrolladora Frontend', // Puesto al que aplicó
    appliedDate: '2026-09-01',      // Fecha de aplicación (ISO)
    status: 'entrevista',           // Estado actual en el proceso
  },
  {
    // Candidato 2: Carlos Ruiz, aplicó a Backend, en revisión
    id: 2,
    name: 'Carlos Ruiz',
    email: 'carlos.ruiz@email.com',
    jobTitle: 'Desarrollador Backend',
    appliedDate: '2026-09-03',
    status: 'en_revision',
  },
  {
    // Candidata 3: Lucía Fernández, aplicó a Diseñadora UX/UI, recién registrado
    id: 3,
    name: 'Lucía Fernández',
    email: 'lucia.fernandez@email.com',
    jobTitle: 'Diseñadora UX/UI',
    appliedDate: '2026-09-05',
    status: 'nuevo',
  },
  {
    // Candidato 4: Pedro Martínez, aplicó a Product Manager, ya contratado
    id: 4,
    name: 'Pedro Martínez',
    email: 'pedro.martinez@email.com',
    jobTitle: 'Product Manager',
    appliedDate: '2026-09-07',
    status: 'contratado',
  },
  {
    // Candidata 5: Ana Torres, aplicó a DevOps Engineer, en entrevista
    id: 5,
    name: 'Ana Torres',
    email: 'ana.torres@email.com',
    jobTitle: 'DevOps Engineer',
    appliedDate: '2026-09-09',
    status: 'entrevista',
  },
  {
    // Candidato 6: Jorge López, aplicó a Frontend, fue rechazado
    id: 6,
    name: 'Jorge López',
    email: 'jorge.lopez@email.com',
    jobTitle: 'Desarrollador Frontend',
    appliedDate: '2026-09-11',
    status: 'rechazado',
  },
  {
    // Candidata 7: Sofía Ramírez, aplicó a Analista de Datos, recibió oferta
    id: 7,
    name: 'Sofía Ramírez',
    email: 'sofia.ramirez@email.com',
    jobTitle: 'Analista de Datos',
    appliedDate: '2026-09-12',
    status: 'ofrecido',
  },
  {
    // Candidato 8: Diego Castro, aplicó a Backend, recién registrado
    id: 8,
    name: 'Diego Castro',
    email: 'diego.castro@email.com',
    jobTitle: 'Desarrollador Backend',
    appliedDate: '2026-09-14',
    status: 'nuevo',
  },
];

// Lista de vacantes hardcodeada con datos de ejemplo para la demostración
export const JOBS: Job[] = [
  {
    id: 1,                           // Identificador único
    title: 'Desarrollador Frontend', // Título del puesto
    department: 'Tecnología',        // Departamento responsable
    location: 'Remoto',              // Ubicación de trabajo
    type: 'Tiempo completo',         // Tipo de jornada
    status: 'abierta',               // Estado de la vacante
  },
  {
    // Vacante 2: Desarrollador Backend, abierta, jornada híbrida
    id: 2,
    title: 'Desarrollador Backend',
    department: 'Tecnología',
    location: 'Híbrido',
    type: 'Tiempo completo',
    status: 'abierta',
  },
  {
    // Vacante 3: Diseñadora UX/UI, abierta, remoto
    id: 3,
    title: 'Diseñadora UX/UI',
    department: 'Diseño',
    location: 'Remoto',
    type: 'Tiempo completo',
    status: 'abierta',
  },
  {
    // Vacante 4: Product Manager, pausada, presencial en Madrid
    id: 4,
    title: 'Product Manager',
    department: 'Producto',
    location: 'Madrid',
    type: 'Tiempo completo',
    status: 'pausada',
  },
  {
    // Vacante 5: DevOps Engineer, abierta, híbrido
    id: 5,
    title: 'DevOps Engineer',
    department: 'Tecnología',
    location: 'Híbrido',
    type: 'Tiempo completo',
    status: 'abierta',
  },
  {
    // Vacante 6: Analista de Datos, cerrada, remoto, jornada parcial
    id: 6,
    title: 'Analista de Datos',
    department: 'Datos',
    location: 'Remoto',
    type: 'Jornada parcial',
    status: 'cerrada',
  },
];