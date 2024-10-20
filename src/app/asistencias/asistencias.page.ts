import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {

  asistencias: any[] = [
    { clase: 'Etica para el trabajo', dia: 'Lunes, 02 de Octubre', estado: 'Presente' },
    //-------------------------------------------------------------------------------------
    { clase: 'Ingles intermedio', dia: 'Martes, 03 de Octubre', estado: 'Ausente' },
    { clase: 'Prgramacion de aplicaciones moviles', dia: 'Martes, 03 de Octubre', estado: 'Ausente' },
    { clase: 'Calidad de software', dia: 'Martes, 03 de Octubre', estado: 'Ausente' },
    //-------------------------------------------------------------------------------------
    { clase: 'Ingles intermedio', dia: 'Miércoles, 04 de Octubre', estado: 'Presente' },
    { clase: 'Arquitectura', dia: 'Miércoles, 04 de Octubre', estado: 'Presente' },
    //-------------------------------------------------------------------------------------
    { clase: 'Ingles intermedio', dia: 'Jueves, 05 de Octubre', estado: 'Presente' },
    { clase: 'Programacion de aplicaciones moviles', dia: 'Jueves, 05 de Octubre', estado: 'Presente' },
    { clase: 'Arquitectura', dia: 'Jueves, 05 de Octubre', estado: 'Presente' },
    { clase: 'Calidad de software', dia: 'Jueves, 05 de Octubre', estado: 'Presente' },
    //-------------------------------------------------------------------------------------
    { clase: 'Ingles intermedio', dia: 'Viernes, 06 de Octubre', estado: 'Ausente' },

  ];


  constructor(private router: Router) { }

  ngOnInit() {
  }

  retorno(){
    this.router.navigate(['/menu']);
  }

}
