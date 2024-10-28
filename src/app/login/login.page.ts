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

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  // Método de inicio de sesión
  async login() {
    if (this.authService.login(this.usuario, this.clave)) {
      localStorage.setItem('usuario', this.usuario);
      // Dirección a menu
      this.router.navigate(['/menu']);
    } else {
      // Error en caso de credenciales inválidas
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Navegar a la página para cambiar la clave
  irACambiarClave() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/clave-nueva']);
    } else {
      this.mostrarAlerta('Error', 'Debe iniciar sesión para acceder a esta página.');
    }
  }

  // Navegar a la página de registro
  irARegistro() {
    this.router.navigate(['/registro']);
  }

  // Mostrar alerta para mensajes genéricos
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

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
