// Importa los tipos de estado de candidato y vacante
import type { CandidateStatus, JobStatus } from './models';

// Mapa que convierte identificadores de estado (snake_case) a etiquetas legibles en español
export const STATUS_LABELS: Record<CandidateStatus | JobStatus, string> = {
  nuevo: 'Nuevo',           // Estado inicial del candidato
  en_revision: 'En revisión', // Siendo evaluado
  entrevista: 'Entrevista',   // En proceso de entrevista
  ofrecido: 'Ofrecido',       // Recibió oferta
  contratado: 'Contratado',   // Contratado exitosamente
  rechazado: 'Rechazado',     // Descartado del proceso
  abierta: 'Abierta',         // Vacante disponible
  cerrada: 'Cerrada',         // Vacante ya no acepta postulantes
  pausada: 'Pausada',         // Vacante temporalmente detenida
};

// Función que retorna la etiqueta legible de un estado dado
export function statusLabel(status: CandidateStatus | JobStatus): string {
  // Si el estado existe en el mapa, retorna la etiqueta; si no, retorna el estado original
  return STATUS_LABELS[status] ?? status;
}

// Función que extrae las iniciales de un nombre completo
export function initials(name: string): string {
  return name
    .split(' ')             // Divide el nombre por espacios
    .filter(Boolean)        // Elimina strings vacíos (de espacios múltiples)
    .slice(0, 2)            // Toma solo las primeras 2 partes (nombre y apellido)
    .map((part) => part[0]?.toUpperCase()) // Extrae la primera letra y la pone en mayúscula
    .join('');              // Concatena las iniciales sin espacios
}

// Función que formatea una fecha ISO a formato local español (dd mes yyyy)
export function formatDate(iso: string): string {
  // Convierte el string ISO a objeto Date
  const date = new Date(iso);
  // Usa toLocaleDateString con español para mostrar formato "1 sep. 2026"
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',   // Día con 2 dígitos (01-31)
    month: 'short',   // Mes abreviado (ene, feb, mar...)
    year: 'numeric',  // Año completo (2026)
  });
}
