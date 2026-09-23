// Importa TestBed — entorno de pruebas unitarias de Angular
import { TestBed } from '@angular/core/testing';
// Importa el componente a testear
import { App } from './app';
// Importa el provider del router para las pruebas
import { provideRouter } from '@angular/router';

// Grupo de tests para el componente App
describe('App', () => {
  // Se ejecuta antes de cada test — configura el módulo de pruebas
  beforeEach(async () => {
    // Configura el TestBed de forma asíncrona
    await TestBed.configureTestingModule({
      // Importa el componente App en el módulo de testing
      imports: [App],
      // Provee un router vacío (sin rutas) para evitar errores de inyección
      providers: [provideRouter([])],
    }).compileComponents(); // Compila templates y estilos del componente
  });

  // Test: el componente debe crearse correctamente
  it('should create the app', () => {
    // Crea una instancia del componente para pruebas
    const fixture = TestBed.createComponent(App);
    // Obtiene la referencia a la clase del componente
    const app = fixture.componentInstance;
    // Verifica que el componente no es nulo ni undefined
    expect(app).toBeTruthy();
  });

  // Test: el componente debe renderizar el nombre de la marca
  it('should render the brand name', async () => {
    // Crea una instancia del componente
    const fixture = TestBed.createComponent(App);
    // Espera a que el componente sea estable (templates cargados)
    await fixture.whenStable();
    // Obtiene el elemento DOM renderizado del componente
    const compiled = fixture.nativeElement as HTMLElement;
    // Verifica que el elemento con clase .brand-name contiene el texto "HireTrack"
    expect(compiled.querySelector('.brand-name')?.textContent).toContain('HireTrack');
  });
});