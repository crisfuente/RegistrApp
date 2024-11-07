import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-asignaturas-docente',
  templateUrl: './asignaturas-docente.page.html',
  styleUrls: ['./asignaturas-docente.page.scss'],
})
export class AsignaturasDocentePage implements OnInit {
  asignaturas: any[] = [];

  // Datos predeterminados de asignaturas para cada docente
  asignaturasDocente = [
    { nombre: 'Arquitectura', seccion: 'ASY4131-003D', mostrarAsistencia: false, mostrarImagen: false, textoQR: '' },
    { nombre: 'Calidad de Software', seccion: 'CSY4111-003D', mostrarAsistencia: false, mostrarImagen: false, textoQR: '' },
    { nombre: 'Programación de aplicaciones móviles', seccion: 'PGY4121-003D', mostrarAsistencia: false, mostrarImagen: false, textoQR: '' }
  ];

  asignaturasJuanCarlosOsses = [
    { nombre: 'Arquitectura', seccion: 'ASY4131-002D', mostrarAsistencia: false, mostrarImagen: false, textoQR: '' },
    { nombre: 'Inglés Intermedio', seccion: 'INI5111-011D', mostrarAsistencia: false, mostrarImagen: false, textoQR: '' },
    { nombre: 'Proceso de Portafolio 4', seccion: 'APY4461-003D', mostrarAsistencia: false, mostrarImagen: false, textoQR: '' }
  ];

  asignaturasPatricioYañez = [
    { nombre: 'Calidad de Software', seccion: 'CSY4111-001D', mostrarAsistencia: false, mostrarImagen: false, textoQR: '' },
    { nombre: 'Ética para el trabajo', seccion: 'EAY4450-003D', mostrarAsistencia: false, mostrarImagen: false, textoQR: '' },
    { nombre: 'Programación de aplicaciones móviles', seccion: 'PGY4121-001D', mostrarAsistencia: false, mostrarImagen: false, textoQR: '' }
  ];

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.cargarAsignaturas();
  }

  cargarAsignaturas() {
    const usuario = sessionStorage.getItem('usuario');
    const asignaturasGuardadas = localStorage.getItem('asignaturas_${usuario}');

    if (asignaturasGuardadas) {
      // Si existen asignaturas guardadas, se cargan
      this.asignaturas = JSON.parse(asignaturasGuardadas);
    } else {
      // Asignar asignaturas predeterminadas según el docente
      if (usuario === 'Docente') {
        this.asignaturas = this.asignaturasDocente;
      } else if (usuario === 'JuanCarlosOsses') {
        this.asignaturas = this.asignaturasJuanCarlosOsses;
      } else if (usuario === 'PatricioYañez') {
        this.asignaturas = this.asignaturasPatricioYañez;
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
    this.guardarAsignaturas(); // Guardar cambios
  }

  retorno() {
    this.router.navigate(['/menu-docente']);
  }

  onAsignaturaButtonClick(index: number) {
    const asignatura = this.asignaturas[index];
    console.log('Asignatura seleccionada:', asignatura.nombre);
  }

  mostrarImagen(index: number) {
    this.asignaturas[index].mostrarImagen = true;
    this.guardarAsignaturas(); // Guardar cambios
  }

  toggleQR(index: number) {
    const asignatura = this.asignaturas[index];
    asignatura.mostrarImagen = !asignatura.mostrarImagen;

    if (asignatura.mostrarImagen) {
      asignatura.textoQR = `Sección: ${asignatura.seccion}`;
    } else {
      asignatura.textoQR = '';  // Limpia el textoQR si se cierra el QR
    }
    this.guardarAsignaturas(); // Guardar cambios
  }
}