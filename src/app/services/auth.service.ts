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
    if (usuario === this.usuarioPrueba.username && clave === this.usuarioPrueba.password) {
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

  verificarClaveAntigua(clave: string): boolean {
    return clave === this.usuarioPrueba.password;
  }

  cambiarClave(nuevaClave: string): void {
    this.usuarioPrueba.password = nuevaClave;
  }
}
