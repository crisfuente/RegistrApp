import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignaturas-docente',
  templateUrl: './asignaturas-docente.page.html',
  styleUrls: ['./asignaturas-docente.page.scss'],
})
export class AsignaturasDocentePage {
  asignaturas: any[] = [
    { nombre: 'Programación de aplicaciones móviles', seccion: 'ASY4131', mostrarAsistencia: false, mostrarImagen: false, textoQR: '' },
    { nombre: 'Programación de aplicaciones móviles', seccion: 'CSY4111', mostrarAsistencia: false, mostrarImagen: false, textoQR: '' },
    { nombre: 'Programación de aplicaciones móviles', seccion: 'EAY4450', mostrarAsistencia: false, mostrarImagen: false, textoQR: '' },
    { nombre: 'Programación de aplicaciones móviles', seccion: 'INI5111', mostrarAsistencia: false, mostrarImagen: false, textoQR: '' },
    { nombre: 'Programación de aplicaciones móviles', seccion: 'PGY4121', mostrarAsistencia: false, mostrarImagen: false, textoQR: '' },
    { nombre: 'Programación de aplicaciones móviles', seccion: 'APY4461', mostrarAsistencia: false, mostrarImagen: false, textoQR: '' }
  ];

  texto: any;
  
  constructor(private router: Router) { }

  ngOnInit() {}

  toggleAsistencia(index: number) {
    this.asignaturas[index].mostrarAsistencia = !this.asignaturas[index].mostrarAsistencia;
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
  }

  toggleQR(index: number) {
    const asignatura = this.asignaturas[index];
    
    // Alternar el estado de mostrarImagen para esta asignatura
    asignatura.mostrarImagen = !asignatura.mostrarImagen;

    // Si se va a mostrar el QR, asigna el texto de la sección como valor de QR
    if (asignatura.mostrarImagen) {
      asignatura.textoQR = `Sección: ${asignatura.seccion}`;
    } else {
      asignatura.textoQR = '';  // Limpia el textoQR si se cierra el QR
    }
  }
}
