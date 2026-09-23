// Importa Component, computed (valor derivado reactivo) y signal (estado reactivo)
import { Component, computed, signal } from '@angular/core';
// Importa los datos de ejemplo y los estados válidos de vacante
import { JOBS, JOB_STATUSES } from '../../data';
// Importa los tipos Job y JobStatus (solo tipos)
import type { Job, JobStatus } from '../../models';
// Importa la función utilitaria para etiquetas de estado
import { statusLabel } from '../../utils';

// Decorador que define las propiedades del componente de vacantes
@Component({
  // Selector CSS del componente — se usa como <app-jobs>
  selector: 'app-jobs',
  // Este componente standalone no importa directivas adicionales
  imports: [],
  // Ruta al archivo de plantilla HTML
  templateUrl: './jobs.html',
  // Ruta al archivo de estilos CSS
  styleUrl: './jobs.css',
})
// Clase del componente de vacantes
export class JobsComponent {
  // Signal reactivo con la lista de vacantes, inicializada con datos de ejemplo
  readonly jobs = signal<Job[]>(JOBS);
  // Array de estados de vacante (constante, se usa para los selects)
  readonly statuses = JOB_STATUSES;

  // Signal que controla si el formulario de nueva vacante está visible (true) u oculto (false)
  readonly showForm = signal(false);
  // Expone la función utilitaria para mostrar etiquetas legibles de estado en el template
  readonly statusLabel = statusLabel;

  // Computed que cuenta cuántas vacantes están abiertas — se recalcula al cambiar la lista
  readonly openCount = computed(() => this.jobs().filter((j) => j.status === 'abierta').length);

  // Método que alterna la visibilidad del formulario de nueva vacante
  toggleForm(): void {
    // update invierte el valor actual: true ↔ false
    this.showForm.update((v) => !v);
  }

  // Método que elimina una vacante de la lista por su id
  remove(id: number): void {
    // update genera un nuevo array sin la vacante cuyo id coincide
    this.jobs.update((list) => list.filter((j) => j.id !== id));
  }

  // Método que cambia el estado de una vacante específica
  onChangeStatus(job: Job, event: Event): void {
    // Lee el nuevo estado desde el select del HTML
    const status = (event.target as HTMLSelectElement).value as JobStatus;
    // update recibe el array actual y retorna uno nuevo (inmutabilidad de signals)
    this.jobs.update((list) =>
      // Mapea cada vacante: si coincide el id, crea una copia con el nuevo estado
      list.map((j) => (j.id === job.id ? { ...j, status } : j)),
    );
  }

  // Handler del formulario de nueva vacante (se dispara al hacer submit)
  onAdd(event: Event): void {
    // Previene el envío por defecto del formulario HTML (recargar la página)
    event.preventDefault();
    // Obtiene la referencia al elemento <form> desde el evento
    const form = event.target as HTMLFormElement;
    // Extrae el valor de cada input y elimina los espacios innecesarios
    const title = (form.elements.namedItem('title') as HTMLInputElement).value.trim();
    const department = (form.elements.namedItem('department') as HTMLInputElement).value.trim();
    const location = (form.elements.namedItem('location') as HTMLInputElement).value.trim();
    const type = (form.elements.namedItem('type') as HTMLInputElement).value.trim();

    // Validación: si algún campo obligatorio está vacío, aborta sin crear la vacante
    if (!title || !department || !location || !type) {
      return;
    }

    // Calcula el nuevo id como el máximo id existente + 1
    const id = Math.max(0, ...this.jobs().map((j) => j.id)) + 1;
    // update agrega la nueva vacante al inicio del array con estado 'abierta' por defecto
    this.jobs.update((list) => [
      { id, title, department, location, type, status: 'abierta' },
      ...list,
    ]);
    // Limpia todos los campos del formulario
    form.reset();
    // Oculta el formulario después de agregar la vacante
    this.showForm.set(false);
  }
}