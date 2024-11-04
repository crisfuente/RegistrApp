import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {

  // Asistencias agrupadas por día
  asistenciasPorDia: any[] = [
    {
      nombre: 'Etica para el trabajo',
      mostrarClases: false,
      clases: [
        { dia: 'lunes 30 de septiempre', estado: 'Ausente' },
        { dia: 'lunes 07 de octubre', estado: 'Presente' },
        { dia: 'Lunes 14 de octubre', estado: 'Ausente' },
        { dia: 'Miercoles 21 de octubre', estado: 'Presente' },
        { dia: 'Miercoles 28 de octubre', estado: 'Presente' }


      ]
    },
    {
      nombre: 'Ingles intermedio',
      mostrarClases: false,
      clases: [
        { dia: 'Martes 01 de octubre', estado: 'Ausente' },
        { dia: 'Miercoles 02 de octubre', estado: 'Presente'},
        { dia: 'Jueves 03 de octubre', estado: 'Presente' },
        { dia: 'Viernes 04 de ocutbre', estado: 'Presente'},
        { dia: 'Viernes 04 de ocutbre', estado: 'Presente'}
      ]
    },
    {
      nombre: 'Arquitectura',
      mostrarClases: false,
      clases: [
        { dia: 'Miercoles 02 de octubre', estado: 'Presente' },
        { dia: 'Jueves 03 de octubre', estado: 'Presente' },
        { dia: 'Miercoles 09 de octubre', estado: 'Ausente' },
        { dia: 'Jueves 10 de octubre', estado: 'Presente' },
        { dia: 'Miercoles 15 de octubre', estado: 'Presente'},
        { dia: 'Jueves 16 de octubre', estado: 'Ausente'}
      ]
    },
    {
      nombre: 'Calidad de Software',
      mostrarClases: false,
      clases: [
        { dia: 'Martes 01 de octubre', estado: 'Ausentr' },
        { dia: 'Jueves 03 de octubre', estado: 'Presente' },
        { dia: 'Martes 08 de octubre', estado: 'Presente' },
        { dia: 'Jueves 10 de octubre', estado: 'Ausente' },
        { dia: 'Martes 15 de octubre', estado: 'Presente' },
        { dia: 'Jueves 17 de octubre', estado: 'Ausente' }
        
      ]
    },
    {
      nombre: 'Programacion de aplicaciones Moviles',
      mostrarClases: false,
      clases: [
        { dia: 'Martes 01 de octubre', estado: 'Presente' },
        { dia: 'Jueves 03 de octubre', estado: 'Presente' },
        { dia: 'Martes 08 de octubre', estado: 'Ausente' },
        { dia: 'Jueves 10 de octubre', estado: 'Presente' },
        { dia: 'Martes 15 de octubre', estado: 'Ausente' },
        { dia: 'Jueves 17 de octubre', estado: 'Presente' }
        
      ]
    },
    {
      nombre: 'Proceso de portafolio 4',
      mostrarClases: false,
      clases: [
        { dia: 'Martes 23 de septiembre', estado: 'Presente' },
        { dia: 'Jueves 21 de octubre', estado: 'Presente' },

      ]
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() { }

  // Alternar la visualización de las clases para cada día
  toggleClases(index: number) {
    this.asistenciasPorDia[index].mostrarClases = !this.asistenciasPorDia[index].mostrarClases;
  }

  // Navegar de vuelta al menú principal
  retorno() {
    this.router.navigate(['/menu']);
  }
}
