import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-asistencia',
  templateUrl: './registro-asistencia.page.html',
  styleUrls: ['./registro-asistencia.page.scss'],
})
export class RegistroAsistenciaPage {
  nombre: string = '';
  fecha: string = '';
  estado: string = '';

  constructor(private alertController: AlertController, private router: Router) {}

  async guardarAsistencia() {
    if (this.nombre && this.fecha && this.estado) {
      const alert = await this.alertController.create({
        header: 'Asistencia Registrada',
        message: `Asistencia de ${this.nombre} registrada como ${this.estado} para el día ${this.fecha}.`,
        buttons: ['OK']
      });
      await alert.present();
      this.router.navigate(['/menu']);
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // retorno menú
  retorno() {
    this.router.navigate(['/menu']);
  }
}
