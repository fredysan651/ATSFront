// Importa el tipo Routes que define la estructura de rutas de Angular
import { Routes } from '@angular/router';

// Exporta el array de rutas de la aplicación
export const routes: Routes = [
  // URL vacía (/) redirige a /login — pathMatch: 'full' exige coincidencia exacta
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    // Ruta para el login — se accede con /login
    path: 'login',
    // Lazy loading: carga el componente solo cuando se navega a esta ruta
    loadComponent: () =>
      // Importa dinámicamente el módulo y extrae LoginComponent
      import('./pages/login/login').then((m) => m.LoginComponent),
  },
  {
    // Ruta para el registro — se accede con /registro
    path: 'registro',
    // Lazy loading: carga el componente solo cuando se navega a esta ruta
    loadComponent: () =>
      // Importa dinámicamente el módulo y extrae RegisterComponent
      import('./pages/register/register').then((m) => m.RegisterComponent),
  },
  {
    // Ruta para el dashboard — se accede con /dashboard
    path: 'dashboard',
    // Lazy loading: carga el componente solo cuando se navega a esta ruta
    loadComponent: () =>
      // Importa dinámicamente el módulo y extrae DashboardComponent
      import('./pages/dashboard/dashboard').then((m) => m.DashboardComponent),
  },
  {
    // Ruta para candidatos — se accede con /candidatos
    path: 'candidatos',
    // Lazy loading: carga CandidatesComponent solo bajo demanda
    loadComponent: () =>
      import('./pages/candidates/candidates').then((m) => m.CandidatesComponent),
  },
  {
    // Ruta para vacantes — se accede con /vacantes
    path: 'vacantes',
    // Lazy loading: carga JobsComponent solo bajo demanda
    loadComponent: () =>
      import('./pages/jobs/jobs').then((m) => m.JobsComponent),
  },
  // Wildcard: cualquier ruta no definida redirige al login (seguridad básica)
  { path: '**', redirectTo: 'login' },
];