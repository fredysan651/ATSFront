// Importa el tipo ApplicationConfig y el provider de errores globales del navegador
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
// Importa la función que provee el router a toda la aplicación
import { provideRouter } from '@angular/router';

// Importa el array de rutas definido en app.routes.ts
import { routes } from './app.routes';

// Exporta la configuración de la aplicación como constante
export const appConfig: ApplicationConfig = {
  // Lista de providers inyectados globalmente
  providers: [
    // Registra listeners para errores no capturados del navegador
    provideBrowserGlobalErrorListeners(),
    // Registra el router con las rutas de la app
    provideRouter(routes)
  ]
};
