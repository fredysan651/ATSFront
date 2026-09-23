// Importamos Component, signals y la nueva forma de inyectar dependencias
import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
// Importamos todo lo necesario para Formularios Reactivos
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  // Importante agregar ReactiveFormsModule para que el [formGroup] funcione en el HTML
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  // Inyección de dependencias moderna (evita llenar el constructor)
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // Señales reactivas para controlar la interfaz mientras procesa
  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  // Definición del formulario y sus validaciones
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  // Método principal al hacer submit
  onSubmit(): void {
    // 1. Si el form está incompleto/inválido, forzamos mostrar los errores de los inputs
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // 2. Iniciamos el estado de carga
    this.isLoading.set(true);
    this.errorMessage.set(null);

    // 3. Extraemos los datos limpios
    const { email, password } = this.loginForm.value;

    // TODO: Aquí va la conexión HTTP real hacia el backend en Django de FUSOFT.
    // Por ahora, simulamos el delay de una petición a la base de datos (ej: PostgreSQL)
    setTimeout(() => {
      // Lógica temporal para probar ruteo
      if (email === 'admin@fusoft.com' && password === '123456') {
        console.log('Autenticación exitosa, cargando dashboard...');
        // Redirigimos al componente del dashboard que ya tienes listo
        this.router.navigate(['/dashboard']);
      } else {
        // En caso de fallo, mostramos el error y quitamos el loading
        this.errorMessage.set('Correo o contraseña incorrectos. Verifica tus datos.');
        this.isLoading.set(false);
      }
    }, 1500); // 1.5 segundos de simulación
  }
}