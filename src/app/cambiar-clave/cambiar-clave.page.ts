import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.page.html',
  styleUrls: ['./cambiar-clave.page.scss'],
})
export class CambiarClavePage {
  formularioCambioClave: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    // Configuración del formulario con validaciones
    this.formularioCambioClave = this.fb.group({
      usuario: ['', [Validators.required]],
      claveActual: ['', [Validators.required]],
      nuevaClave: ['', [Validators.required, Validators.minLength(6)]],
      confirmarClave: ['', [Validators.required]]
    }, { validator: this.compararClaves });
  }

  // Validación personalizada para verificar que las nuevas contraseñas coincidan
  compararClaves(group: FormGroup): { [key: string]: any } | null {
    const nuevaClave = group.get('nuevaClave')?.value;
    const confirmarClave = group.get('confirmarClave')?.value;
    return nuevaClave === confirmarClave ? null : { noCoincide: true };
  }

  // Método para cambiar la contraseña
  async cambiarClave() {
    // Validar que el formulario esté completo y correcto
    if (this.formularioCambioClave.invalid) {
      return;
    }

    const usuario = this.formularioCambioClave.value.usuario;
    const claveActual = this.formularioCambioClave.value.claveActual;
    const nuevaClave = this.formularioCambioClave.value.nuevaClave;

    // Verificar que la clave actual proporcionada sea correcta
    const claveCorrecta = this.authService.verificarClaveActual(usuario, claveActual);
    if (!claveCorrecta) {
      await this.mostrarAlerta('Error', 'La contraseña actual es incorrecta.');
      return;
    }

    // Si la clave actual es correcta, proceder al cambio
    const cambioExitoso = this.authService.cambiarClave(usuario, nuevaClave);
    if (cambioExitoso) {
      await this.mostrarAlerta('Éxito', 'La contraseña ha sido cambiada con éxito.');
      this.router.navigate(['/login']);  // Redirigir al login en lugar de menú
    } else {
      await this.mostrarAlerta('Error', 'El usuario no existe.');
    }
  }

  // Método para mostrar mensajes de alerta
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Método para capturar el input de la nueva contraseña
  onPasswordInput() {
    const nuevaClaveControl = this.formularioCambioClave.get('nuevaClave');
    if (nuevaClaveControl?.hasError('minlength') && nuevaClaveControl?.touched) {
      this.mostrarAlerta('Advertencia', 'La nueva contraseña debe tener al menos 6 caracteres.');
    }
  }

  // Método para retornar al menú según el rol
  retorno() {
    const usuario = this.formularioCambioClave.get('usuario')?.value;
    const rol = this.authService.getUserRole(usuario);
    if (rol === 'Alumno') {
      this.router.navigate(['menu']);
    } else if (rol === 'Docente') {
      this.router.navigate(['menu-docente']);
    }
  }
}
