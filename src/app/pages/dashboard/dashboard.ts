// Importa Component, computed (valor derivado reactivo) y signal (estado reactivo)
import { Component, computed, signal } from '@angular/core';
// Importa RouterLink para crear enlaces de navegación en el template
import { RouterLink } from '@angular/router';
// Importa los datos de ejemplo de candidatos y vacantes
import { CANDIDATES, JOBS } from '../../data';
// Importa el tipo Candidate (solo tipos)
import type { Candidate } from '../../models';
// Importa funciones utilitarias de formato
import { formatDate, initials, statusLabel } from '../../utils';

// Interfaz local que define la estructura de una tarjeta de estadística del dashboard
interface StatCard {
  label: string; // Texto de la tarjeta (ej: "Candidatos")
  value: number; // Valor numérico a mostrar
  icon: string;  // Emoji o icono decorativo
  color: string; // Clave de color CSS aplicada a la tarjeta
}

// Decorador que define las propiedades del componente dashboard
@Component({
  // Selector CSS del componente — se usa como <app-dashboard>
  selector: 'app-dashboard',
  // Importa RouterLink para usar enlaces en el template
  imports: [RouterLink],
  // Ruta al archivo de plantilla HTML
  templateUrl: './dashboard.html',
  // Ruta al archivo de estilos CSS
  styleUrl: './dashboard.css',
})
// Clase del componente dashboard
export class DashboardComponent {
  // Signal reactivo con la lista de candidatos, inicializada con datos de ejemplo
  readonly candidates = signal<Candidate[]>(CANDIDATES);

  // Expone las funciones utilitarias para usarlas en el template HTML
  readonly initials = initials;
  readonly statusLabel = statusLabel;
  readonly formatDate = formatDate;

  // Computed que genera las tarjetas de estadísticas — se recalcula si cambian los candidatos
  readonly stats = computed<StatCard[]>(() => {
    // Lee el valor actual del signal de candidatos
    const list = this.candidates();
    return [
      {
        // Tarjeta 1: total de candidatos registrados
        label: 'Candidatos',
        value: list.length,
        icon: '👥',       // Icono de personas
        color: 'indigo',  // Color CSS
      },
      {
        // Tarjeta 2: candidatos en fase de entrevista
        label: 'En entrevista',
        value: list.filter((c) => c.status === 'entrevista').length,
        icon: '🗓️',     // Icono de calendario
        color: 'blue',
      },
      {
        // Tarjeta 3: candidatos que ya fueron contratados
        label: 'Contratados',
        value: list.filter((c) => c.status === 'contratado').length,
        icon: '✅',      // Icono de verificación
        color: 'green',
      },
      {
        // Tarjeta 4: vacantes disponibles (estado 'abierta')
        label: 'Vacantes abiertas',
        value: JOBS.filter((j) => j.status === 'abierta').length,
        icon: '💼',      // Icono de maletín
        color: 'amber',
      },
    ];
  });

  // Computed que retorna los 5 candidatos más recientes según su fecha de aplicación
  readonly recentCandidates = computed(() =>
    // Copia el array (spread) para no mutar el signal original
    [...this.candidates()]
      // Ordena de más reciente a más antiguo comparando timestamps de las fechas
      .sort(
        (a, b) =>
          new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime(),
      )
      // Toma solo los primeros 5 elementos
      .slice(0, 5),
  );

  // Computed que retorna solo las vacantes con estado 'abierta'
  readonly openJobs = computed(() => JOBS.filter((j) => j.status === 'abierta'));
}