import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu-docente',
  templateUrl: './menu-docente.page.html',
  styleUrls: ['./menu-docente.page.scss'],
})
export class MenuDocentePage implements OnInit {

  constructor(private router : Router, private authService : AuthService) { }

  ngOnInit() {
  }

  asignaturasDocente() {
    this.router.navigate(['/asignaturas-docente']);
  }
  cambiarClave(){
    this.router.navigate(['/cambiar-clave'])
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  registroAsistencia(){
    this.router.navigate(['/registro-asistencia'])
  }


}
