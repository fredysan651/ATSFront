// Importa la función que arranca la aplicación Angular standalone (sin módulos NgModule)
import { bootstrapApplication } from '@angular/platform-browser';

// Importa la configuración global de la app (providers, router, listeners de errores)
import { appConfig } from './app/app.config';

// Importa el componente raíz de la aplicación
import { App } from './app/app';

// Arranca la app con el componente App y la configuración appConfig
bootstrapApplication(App, appConfig)
  // Si falla el arranque, imprime el error en consola
  .catch((err) => console.error(err));
