import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nueva-clave',
  templateUrl: './nueva-clave.page.html',
  styleUrls: ['./nueva-clave.page.scss'],
})
export class NuevaClavePage {
  formularioClave: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.formularioClave = this.fb.group({
      claveAntigua: ['', [Validators.required]],
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
    const claveAntigua = this.formularioClave.value.claveAntigua;
    const nuevaClave = this.formularioClave.value.nuevaClave;

    if (this.authService.verificarClaveAntigua(claveAntigua)) {
      this.authService.cambiarClave(nuevaClave);
      await this.mostrarAlerta('Éxito', 'La contraseña ha sido cambiada con éxito.');
      this.authService.logout(); // Desloguear después de cambiar la clave
    } else {
      await this.mostrarAlerta('Error', 'La clave antigua no es correcta.');
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

  //retorno al login
  retorno(){
    this.router.navigate(['/login']);
  }

  //retorno al menu
  retorno2(){
    this.router.navigate(['/menu']);
  }
}
