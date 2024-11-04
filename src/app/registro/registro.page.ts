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

  // Método para registrar al usuario
  async registrar() {
    if (this.formularioRegistro.valid) {
      const { nombre, apellido, edad, rut, fechaNacimiento, correo, nuevaClave, rolSeleccionado } = this.formularioRegistro.value;
      
      // Registro de usuario en authService
      const registroExitoso = this.authService.registrar({
        nombre,
        apellido,
        edad,
        rut,
        fechaNacimiento,
        clave: nuevaClave,   // Ajustar la propiedad a 'clave' en lugar de 'password'
        rol: rolSeleccionado,
        correo
      });

      if (registroExitoso) {
        await this.mostrarAlerta('Éxito', 'Usuario registrado correctamente.');
        this.router.navigate(['/login']);
      } else {
        await this.mostrarAlerta('Error', 'El nombre de usuario ya existe. Intente con otro.');
      }
    } else {
      await this.mostrarAlerta('Error', 'Por favor, complete todos los campos correctamente.');
    }
  }

  // Método para retorno al menú o a otra página
  retorno() {
    this.router.navigate(['/menu']); // Cambia '/menu' por la ruta deseada
  }
}
