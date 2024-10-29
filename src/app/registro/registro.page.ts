import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  nuevoUsuario: string = '';
  nuevaClave: string = '';
  rolSeleccionado: string = ''; // Variable para el rol seleccionado

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  async registrar() {
    if (this.nuevoUsuario && this.nuevaClave && this.rolSeleccionado) {
      // Llama a AuthService pasando el rol
      const registroExitoso = this.authService.registrar(this.nuevoUsuario, this.nuevaClave, this.rolSeleccionado);
      if (registroExitoso) {
        await this.mostrarAlerta('Éxito', 'Usuario registrado correctamente.');
        this.router.navigate(['/login']); // Redirigir al login después de registrarse
      } else {
        await this.mostrarAlerta('Error', 'El nombre de usuario ya existe. Intente con otro.');
      }
    } else {
      await this.mostrarAlerta('Error', 'Por favor, complete todos los campos.');
    }
  }

  // Mostrar alertas de éxito o error
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Volver al login
  retornoLogin() {
    this.router.navigate(['/login']);
  }
}
