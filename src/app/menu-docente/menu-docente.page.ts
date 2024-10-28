import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu-docente',
  templateUrl: './menu-docente.page.html',
  styleUrls: ['./menu-docente.page.scss'],
})
export class MenuDocentePage {
  usuario: string = '';

  constructor(private router: Router, private authService: AuthService) {
    // Recuperar el nombre del usuario almacenado en localStorage
    this.usuario = localStorage.getItem('usuario') || 'Docente'; // Valor por defecto
  }

  // Función para acceder a la página de asignaturas
  asignaturas() {
    this.router.navigate(['/asignaturas-docente']);
  }

  // Función para crear el código QR
  crearQR() {
    this.router.navigate(['/crear-qr']);
  }

  // Función para cambiar la clave
  cambiarClave() {
    this.router.navigate(['/clave-nueva']);
  }

  // Función para cerrar sesión
  logout() {
    this.authService.logout(); // Llama al servicio de autenticación para cerrar sesión
    this.router.navigate(['/login']); // Navegar a la página de inicio de sesión
  }
}
