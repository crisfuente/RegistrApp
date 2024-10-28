import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-nueva-clave',
  templateUrl: './nueva-clave.page.html',
  styleUrls: ['./nueva-clave.page.scss'],
})
export class NuevaClavePage {
  formularioClave: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    this.formularioClave = this.fb.group({
      usuario: ['', [Validators.required]],
      nuevaClave: ['', [Validators.required, Validators.minLength(6)]],
      confirmarClave: ['', [Validators.required]]
    }, { validator: this.compararClaves });
  }

  compararClaves(group: FormGroup): { [key: string]: any } | null {
    const nuevaClave = group.get('nuevaClave')?.value;
    const confirmarClave = group.get('confirmarClave')?.value;
    return nuevaClave === confirmarClave ? null : { noCoincide: true };
  }

  async cambiarClave() {
    const usuario = this.formularioClave.value.usuario;
    const nuevaClave = this.formularioClave.value.nuevaClave;

    const cambioExitoso = this.authService.cambiarClave(usuario, nuevaClave);
    if (cambioExitoso) {
      await this.mostrarAlerta('Éxito', 'La contraseña ha sido cambiada con éxito.');
      this.authService.logout();
      this.router.navigate(['/login']);
    } else {
      await this.mostrarAlerta('Error', 'El usuario no existe.');
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

  retorno() {
    this.router.navigate(['/menu']);
  }

  retorno2() {
    this.router.navigate(['/login']);
  }
}
