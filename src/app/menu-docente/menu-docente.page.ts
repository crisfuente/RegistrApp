import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu-docente',
  templateUrl: './menu-docente.page.html',
  styleUrls: ['./menu-docente.page.scss'],
})
export class MenuDocentePage implements OnInit {
  usuario: string = '';
  mensajeBienvenida: string = '';  // Nueva propiedad para el mensaje de bienvenida

  constructor(private router: Router, private authService: AuthService) {}

  ionViewWillEnter() {
    // Obtiene el nombre del usuario del sessionStorage
    this.usuario = sessionStorage.getItem('usuario') || 'Invitado';

    // Establece el mensaje de bienvenida
    this.mensajeBienvenida = 'Bienvenido, ${this.usuario}';

    // Redirige al login si el usuario no está autenticado
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
  
  ngOnInit() {}

  asignaturas() {
    this.router.navigate(['/asignaturas-docente']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  cambiarClave() {
    this.router.navigate(['/cambiar-clave']);
  }
}