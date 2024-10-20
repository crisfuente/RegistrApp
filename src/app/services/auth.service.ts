import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioPrueba = {
    username: 'Usuario1',
    password: 'MiClav3'
  };

  constructor() { }

  login(usuario: string, clave: string): boolean {
    // Verifica si el usuario y clave coinciden con el usuario de prueba
    if (usuario === this.usuarioPrueba.username && clave === this.usuarioPrueba.password) {
      // Almacena el estado de autenticación
      localStorage.setItem('loggedIn', 'true');
      return true;
    } else {
      return false;
    }

  }
  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  logout(): void {
    localStorage.removeItem('loggedIn');
  }
}