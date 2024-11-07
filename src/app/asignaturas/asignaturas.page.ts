import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {
  asignaturas: any[] = [];

  // Listas de asignaturas con diferentes secciones para cada usuario
  asignaturasAlumno = [
    { nombre: 'Arquitectura', seccion: 'ASY4131-003D', mostrarAsistencia: false },
    { nombre: 'Calidad de software', seccion: 'CSY4111-003D', mostrarAsistencia: false },
    { nombre: 'Ética para el trabajo', seccion: 'EAY4450-002D', mostrarAsistencia: false },
    { nombre: 'Inglés intermedio', seccion: 'INI5111-012D', mostrarAsistencia: false },
    { nombre: 'Programación de aplicaciones móviles', seccion: 'PGY4121-003D', mostrarAsistencia: false },
    { nombre: 'Proceso de portafolio 4', seccion: 'APY4461-004D', mostrarAsistencia: false }
  ];

  asignaturasAlexis = [
    { nombre: 'Arquitectura', seccion: 'ASY4131-002C', mostrarAsistencia: false },
    { nombre: 'Calidad de software', seccion: 'CSY4111-002C', mostrarAsistencia: false },
    { nombre: 'Ética para el trabajo', seccion: 'EAY4450-001C', mostrarAsistencia: false },
    { nombre: 'Inglés intermedio', seccion: 'INI5111-011C', mostrarAsistencia: false },
    { nombre: 'Programación de aplicaciones móviles', seccion: 'PGY4121-002C', mostrarAsistencia: false },
    { nombre: 'Proceso de portafolio 4', seccion: 'APY4461-003C', mostrarAsistencia: false }
  ];

  asignaturasToñito = [
    { nombre: 'Arquitectura', seccion: 'ASY4131-001A', mostrarAsistencia: false },
    { nombre: 'Calidad de software', seccion: 'CSY4111-001A', mostrarAsistencia: false },
    { nombre: 'Ética para el trabajo', seccion: 'EAY4450-002A', mostrarAsistencia: false },
    { nombre: 'Inglés intermedio', seccion: 'INI5111-010A', mostrarAsistencia: false },
    { nombre: 'Programación de aplicaciones móviles', seccion: 'PGY4121-001A', mostrarAsistencia: false },
    { nombre: 'Proceso de portafolio 4', seccion: 'APY4461-002A', mostrarAsistencia: false }
  ];

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.cargarAsignaturas();
  }

  cargarAsignaturas() {
    const usuario = sessionStorage.getItem('usuario');
    const asignaturasGuardadas = localStorage.getItem('asignaturas_${usuario}');

    if (asignaturasGuardadas) {
      // Cargar asignaturas desde localStorage si existen
      this.asignaturas = JSON.parse(asignaturasGuardadas);
    } else {
      // Asignar asignaturas predeterminadas según el usuario
      switch (usuario) {
        case 'Alumno':
          this.asignaturas = this.asignaturasAlumno;
          break;
        case 'Alexis':
          this.asignaturas = this.asignaturasAlexis;
          break;
        case 'Toñito':
          this.asignaturas = this.asignaturasToñito;
          break;
        default:
          this.asignaturas = [];  // Si el usuario no es reconocido
      }
      // Guardar las asignaturas en localStorage
      this.guardarAsignaturas();
    }
  }

  guardarAsignaturas() {
    const usuario = sessionStorage.getItem('usuario');
    localStorage.setItem('asignaturas_${usuario}', JSON.stringify(this.asignaturas));
  }

  toggleAsistencia(index: number) {
    this.asignaturas[index].mostrarAsistencia = !this.asignaturas[index].mostrarAsistencia;
    this.guardarAsignaturas(); // Guardar cambios en localStorage
  }

  retorno() {
    this.router.navigate(['/menu']);
  }
}