// Importa Component, computed (valor derivado reactivo) y signal (estado reactivo)
import { Component, computed, signal } from '@angular/core';
// Importa los datos de ejemplo y los estados válidos de candidato
import { CANDIDATES, CANDIDATE_STATUSES } from '../../data';
// Importa los tipos Candidate y CandidateStatus (solo tipos)
import type { Candidate, CandidateStatus } from '../../models';
// Importa funciones utilitarias de formato
import { formatDate, initials, statusLabel } from '../../utils';

// Decorador que define las propiedades del componente de candidatos
@Component({
  // Selector CSS del componente — se usa como <app-candidates> en el HTML
  selector: 'app-candidates',
  // Este componente standalone no importa directivas adicionales
  imports: [],
  // Ruta al archivo de plantilla HTML
  templateUrl: './candidates.html',
  // Ruta al archivo de estilos CSS
  styleUrl: './candidates.css',
})
// Clase del componente de candidatos
export class CandidatesComponent {
  // Signal reactivo con la lista de candidatos, inicializada con datos de ejemplo
  readonly candidates = signal<Candidate[]>(CANDIDATES);
  // Array de estados disponibles (constante, se usa para el filtro y selects)
  readonly statuses = CANDIDATE_STATUSES;

  // Signal reactivo que almacena el texto actual de búsqueda
  readonly search = signal('');
  // Signal reactivo con el filtro de estado — por defecto muestra todos ('todos')
  readonly statusFilter = signal<CandidateStatus | 'todos'>('todos');

  // Expone las funciones utilitarias a la clase para usarlas directamente en el template HTML
  readonly initials = initials;
  readonly statusLabel = statusLabel;
  readonly formatDate = formatDate;

  // Computed — se recalcula automáticamente cuando cambian search o statusFilter
  readonly filteredCandidates = computed(() => {
    // Obtiene el texto de búsqueda, normalizado: sin espacios sobrantes y en minúsculas
    const query = this.search().trim().toLowerCase();
    // Obtiene el filtro de estado actual
    const status = this.statusFilter();
    // Filtra la lista de candidatos
    return this.candidates().filter(
      (c) =>
        // Filtro por estado: si es 'todos' pasa todo, sino exige coincidencia exacta
        (status === 'todos' || c.status === status) &&
        // Filtro por búsqueda: si no hay query, pasa todo; si hay, busca en nombre, email o puesto
        (!query ||
          c.name.toLowerCase().includes(query) ||        // Coincidencia en nombre
          c.email.toLowerCase().includes(query) ||       // Coincidencia en email
          c.jobTitle.toLowerCase().includes(query)),     // Coincidencia en puesto
    );
  });

  // Handler del input de búsqueda — lee el valor del input y lo guarda en el signal
  onSearch(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
  }

  // Handler del select de filtro de estado — actualiza el signal con el valor seleccionado
  onStatusFilter(event: Event): void {
    this.statusFilter.set(
      // Convierte el valor del select al tipo CandidateStatus o 'todos'
      (event.target as HTMLSelectElement).value as CandidateStatus | 'todos',
    );
  }

  // Método que cambia el estado de un candidato específico
  onChangeStatus(candidate: Candidate, event: Event): void {
    // Lee el nuevo estado desde el select del HTML
    const status = (event.target as HTMLSelectElement).value as CandidateStatus;
    // update recibe el array actual y retorna uno nuevo (inmutabilidad de signals)
    this.candidates.update((list) =>
      // Mapea cada candidato: si coincide el id, crea una copia con el nuevo estado
      list.map((c) => (c.id === candidate.id ? { ...c, status } : c)),
    );
  }

  // Método que elimina un candidato de la lista
  onDelete(id: number): void {
    // update genera un nuevo array sin el candidato cuyo id coincide
    this.candidates.update((list) => list.filter((c) => c.id !== id));
  }
}