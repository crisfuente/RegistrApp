import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  usuario: string = '';
  capturedImage: string | null = null; // Variable para almacenar la imagen capturada

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  asignaturas() {
    this.router.navigate(['/asignaturas']);
  }

  ionViewWillEnter() {
    // Establece el nombre del usuario
    this.usuario = localStorage.getItem('usuario') || 'Invitado';

    // Redirige al login si el usuario no está autenticado
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  asistencias() {
    this.router.navigate(['/asistencias']);
  }

  cambiarClave() {
    this.router.navigate(['/nueva-clave']);
  }

  registroAsistencia() {
    this.router.navigate(['/registro-asistencia']);
  }

  // Método para abrir la cámara
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
