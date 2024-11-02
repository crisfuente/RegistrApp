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
  rol: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  async login() {
    if (!this.usuario || !this.clave) {
      await this.mostrarAlerta('Error', 'Por favor, complete todos los campos.');
      return; // Salir si los campos están vacíos
    }

    try {
      const isValidUser = await this.authService.login(this.usuario, this.clave);

      if (isValidUser) {
        this.rol = this.authService.getUserRole(this.usuario) || '';

        if (this.rol === 'alumno') {
          this.router.navigate(['/menu']);
        } else if (this.rol === 'docente') {
          this.router.navigate(['/menu-docente']);
        } else {
          this.mostrarAlerta('Error', 'Rol de usuario no reconocido.');
        }
      } else {
        this.mostrarAlerta('Error', 'Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      this.mostrarAlerta('Error', 'Ocurrió un error inesperado.');
      console.error(error);
    }
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  registrar() {
    this.router.navigate(['/registrar']);
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
