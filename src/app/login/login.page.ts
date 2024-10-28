import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario: string = '';
  clave: string = '';
  rol: string = ''; // Inicialmente es un string vacío

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  // Método de inicio de sesión
  async login() {
    try {
      // Llamar al servicio de autenticación
      const isValidUser = await this.authService.login(this.usuario, this.clave);

      if (isValidUser) {
        // Obtener el rol del usuario autenticado (asignar cadena vacía si es null)
        this.rol = this.authService.getUserRole(this.usuario) || ''; 

        // Redirigir según el rol
        if (this.rol === 'alumno') {
          this.router.navigate(['/menu']);
        } else if (this.rol === 'docente') {
          this.router.navigate(['/menu-docente']);
        } else {
          this.mostrarAlerta('Error', 'Rol de usuario no reconocido.');
        }
      } else {
        // Mostrar error si las credenciales son incorrectas
        this.mostrarAlerta('Error', 'Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      this.mostrarAlerta('Error', 'Ocurrió un error inesperado.');
      console.error(error);
    }
  }

  // Método para mostrar una alerta
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Navegar a la página de registro
  irARegistro() {
    this.router.navigate(['/registro']);
  }

  // Navegar a la página para recuperar la clave
  async recuperarClave() {
    const alert = await this.alertController.create({
      header: 'Recuperación de Clave',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/nueva-clave']);
          }
        }
      ]
    });
    await alert.present();
  }
}
