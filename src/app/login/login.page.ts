import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

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
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  // Método de inicio de sesión
  async login() {
    const isValidUser = await this.authService.login(this.usuario, this.clave);

    if (isValidUser) {
      const role = this.authService.getUserRole();  // Obtener el rol del usuario autenticado

      if (role === 'alumno') {
        this.router.navigate(['/menu']);  // Redirigir al menú de alumnos
      } else if (role === 'docente') {
        this.router.navigate(['/menu-docente']);  // Redirigir al menú de docentes
      } else {
        this.mostrarAlerta('Error', 'Rol no reconocido.');
      }
    } else {
      this.mostrarAlerta('Error', 'Usuario o contraseña incorrectos.');
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
}