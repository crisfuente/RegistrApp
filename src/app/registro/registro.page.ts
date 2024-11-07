import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  formularioRegistro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) {
    this.formularioRegistro = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: [null, [Validators.required, Validators.min(1)]],
      rut: ['', Validators.required],
      fechaNacimiento: [
        '', 
        [
          Validators.required,
          Validators.pattern(/^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/)
        ]
      ],
      correo: ['', [Validators.required, Validators.email]],
      nuevaClave: ['', [Validators.required, Validators.minLength(6)]],
      rolSeleccionado: ['', Validators.required],
    });
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