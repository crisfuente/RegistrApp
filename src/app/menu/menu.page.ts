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
  capturedImage: string | null = null; // Declaración de `capturedImage`

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Redirige al login si el usuario no está autenticado
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      // Establece el nombre del usuario
      this.usuario = localStorage.getItem('usuario') || 'Invitado';
    }
  }

  ionViewWillEnter() {
    // Actualiza el nombre del usuario cuando se entra en la vista
    this.usuario = localStorage.getItem('usuario') || 'Invitado';
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
