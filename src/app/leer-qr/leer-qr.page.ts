import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leer-qr',
  templateUrl: './leer-qr.page.html',
  styleUrls: ['./leer-qr.page.scss'],
})
export class LeerQRPage {

  constructor(
    private barcodeScanner: BarcodeScanner,
    private alertController: AlertController,
    private platform: Platform,  // Agregamos Platform para verificar el entorno
    private router: Router
  ) {}

  // Método para escanear código QR
  async escanearCodigoQR() {
    // Verifica si la aplicación está en un entorno compatible (dispositivo real)
    if (this.platform.is('cordova') || this.platform.is('capacitor')) {
      try {
        const data = await this.barcodeScanner.scan();
        if (data.cancelled) {
          return; // Si el usuario cancela el escaneo, no se hace nada
        }
        // Mostrar el resultado del escaneo
        await this.mostrarAlerta('Código QR Escaneado', `Contenido: ${data.text}`);
      } catch (error) {
        await this.mostrarAlerta('Error', 'No se pudo escanear el código QR. Intente de nuevo.');
        console.error(error);
      }
    } else {
      // Si no es compatible, muestra una advertencia
      await this.mostrarAlerta('Error', 'La cámara no está disponible en este entorno. Prueba en un dispositivo real.');
      console.warn('Cordova no está disponible');
    }
  }

  // Método para mostrar alertas
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Método de retorno
  retorno() {
    this.router.navigate(['/menu']); // Cambia '/menu' por la ruta deseada
  }
}
