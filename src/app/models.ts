// Tipo unión string con los 6 estados posibles de un candidato
export type CandidateStatus =
  | 'nuevo'        // Candidato recién registrado
  | 'en_revision'  // Siendo revisado por el reclutador
  | 'entrevista'   // En fase de entrevista
  | 'ofrecido'     // Se le hizo una oferta
  | 'contratado'   // Fue contratado
  | 'rechazado';   // Fue descartado

// Tipo unión string con los 3 estados posibles de una vacante
export type JobStatus = 'abierta' | 'cerrada' | 'pausada';

// Interfaz que define la estructura de un candidato
export interface Candidate {
  id: number;        // Identificador único del candidato
  name: string;      // Nombre completo del candidato
  email: string;     // Correo electrónico de contacto
  jobTitle: string;  // Puesto al que aplicó
  appliedDate: string; // Fecha de aplicación en formato ISO (YYYY-MM-DD)
  status: CandidateStatus; // Estado actual en el proceso de selección
}

// Interfaz que define la estructura de una vacante
export interface Job {
  id: number;        // Identificador único de la vacante
  title: string;     // Título del puesto
  department: string; // Departamento al que pertenece
  location: string;  // Ubicación (Remoto, Híbrido, presencial, ciudad)
  type: string;      // Tipo de jornada (Tiempo completo, Jornada parcial)
  status: JobStatus; // Estado de la vacante (abierta, cerrada, pausada)
}
