import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage {
  asignaturas: any[] = [
    { nombre: 'Arquitectura', seccion: 'ASY4131', mostrarAsistencia: false },
    { nombre: 'Calidad de software', seccion: 'CSY4111',  mostrarAsistencia: false },
    { nombre: 'Ética para el trabajo', seccion: 'EAY4450', mostrarAsistencia: false },
    { nombre: 'Inglés intermedio', seccion: 'INI5111', mostrarAsistencia: false },
    { nombre: 'Programación de aplicaciones móviles', seccion: 'PGY4121', mostrarAsistencia: false },
    { nombre: 'Proceso de portafolio 4', seccion: 'APY4461', mostrarAsistencia: false }
    
  ];

  constructor(private router: Router) { }

  // Función para alternar la visualización de la asistencia
  toggleAsistencia(index: number) {
    this.asignaturas[index].mostrarAsistencia = !this.asignaturas[index].mostrarAsistencia;
  }

  // Función para volver al menú principal
  retorno() {
    this.router.navigate(['/menu']);
  }
}