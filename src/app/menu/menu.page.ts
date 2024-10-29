import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],

})

export class MenuPage implements OnInit {
  usuario: string ='';

  constructor( private router : Router, private authService : AuthService) { }


  ngOnInit() {

  }

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
  
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  asistencias() {
    this.router.navigate(['/asistencias']);
  }


  cambiarClave() {
    this.router.navigate(['/nueva-clave']);
  }

  registroAsistencia(){
    this.router.navigate(['/registro-asistencia'])
  }
}
