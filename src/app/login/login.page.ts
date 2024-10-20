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

  constructor(private router: Router, private alertController: AlertController, private authService: AuthService) {}

  // Método de inicio de sesión
  async login() {

    if (this.authService.login(this.usuario, this.clave)) {
      localStorage.setItem('usuario', this.usuario);
      // direccion a menu
      this.router.navigate(['/menu']);
    } else {
      // error en caso de credenciales invalidas
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async recuperarClave() {
    const alert = await this.alertController.create({
      header: 'Recuperación de Clave',
      message: 'Se ha enviado un correo para restablecer la contraseña.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
