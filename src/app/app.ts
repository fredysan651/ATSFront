// Importa el decorador @Component de Angular
import { Component } from '@angular/core';
// Importa directivas del router para navegación y enlaces
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

// Decorador que define las propiedades del componente
@Component({
  // Selector CSS del componente — se usa como <app-root> en el HTML
  selector: 'app-root',
  // Directivas importadas: RouterOutlet renderiza rutas, RouterLink crea enlaces, RouterLinkActive marca el enlace activo
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  // Ruta al archivo de plantilla HTML del componente
  templateUrl: './app.html',
  // Ruta al archivo de estilos CSS del componente
  styleUrl: './app.css',
})
// Clase del componente — vacía porque la lógica está en el template y el router
export class App {}
