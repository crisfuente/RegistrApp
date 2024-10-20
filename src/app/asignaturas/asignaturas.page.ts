import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage {
  asignaturas: any[] = [
    { nombre: 'Arquitectura', seccion: 'ASY4131' },
    { nombre: 'Calidad de software', seccion: 'CSY4111'},
    { nombre: 'Etica para el trabajo', seccion: 'EAY4450' },
    { nombre: 'Ingles intermedio', seccion: 'INI5111' },
    { nombre: 'Proceso de porfalio 4', seccion: 'APY4461' },
    { nombre: 'Programacion de aplicaciones moviles', seccion: 'PGY4121' },
  ];

  constructor(private router: Router) {}

  // menú
  retorno(){
    this.router.navigate(['/menu']);
  }


}
