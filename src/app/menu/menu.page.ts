import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalController, Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  usuario: string = '';
  capturedImage: string | null = null; // Declaración de `capturedImage`
  segment = 'scan';
  scanResult = '';

  constructor(
    private router: Router, 
    private authService: AuthService,
    private modalController: ModalController,
    private platform: Platform,
  ) {}

    async startScan() {
      const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: { 
        formats : [],
        LensFacing: LensFacing.Back
       }
      });
    
      await modal.present();
    
      const {data} = await modal.onWillDismiss();

      if(data) {
        this.scanResult = data?.barcode?.displayValue;
      }
    }

  ngOnInit() {
    // Redirige al login si el usuario no está autenticado
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      // Establece el nombre del usuario
      this.usuario = sessionStorage.getItem('usuario') || 'Invitado';
    }

    if(this.platform.is('capacitor')){
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners;
    }
  }

  ionViewWillEnter() {
    // Actualiza el nombre del usuario cuando se entra en la vista
    this.usuario = sessionStorage.getItem('usuario') || 'Invitado';
  }

  // Métodos de navegación
  asignaturas() {
    this.router.navigate(['/asignaturas']);
  }

  asistencias() {
    this.router.navigate(['/asistencias']);
  }

  recuperarClave() {
    this.router.navigate(['/nueva-clave']);
  }

  registroAsistencia() {
    this.router.navigate(['/registro-asistencia']);
  }

  cambiarClave() {
    this.router.navigate(['/cambiar-clave']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Método para abrir la cámara y capturar imagen
  async abrirCamara() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      this.capturedImage = image.dataUrl ?? null;
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
    }
  }
}
