import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu-docente',
  templateUrl: './menu-docente.page.html',
  styleUrls: ['./menu-docente.page.scss'],
})
export class MenuDocentePage implements OnInit {
  usuario: string='';
  constructor(private router : Router, private authService : AuthService) { }
  ionViewWillEnter() {
    // Establece el nombre del usuario
    this.usuario = localStorage.getItem('usuario') || 'Invitado';

    // Redirige al login si el usuario no está autenticado
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
  
  ngOnInit() {
  }

  asignaturas() {
    this.router.navigate(['/asignaturas-docente']);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  cambiarClave() {
    this.router.navigate(['/cambiar-clave']);
  }
}
