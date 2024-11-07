import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Usuarios registrados con roles
  private usuariosRegistrados = [
    { username: 'Alumno', password: '123456', role: 'alumno' },
    { username: 'Alexis', password: '123456', role: 'alumno' },
    { username: 'Toñito', password: '123456', role: 'alumno' },
    { username: 'Docente', password: '123456', role: 'docente' },
    { username: 'JuanCarlosOsses', password: '123456', role: 'docente' },
    { username: 'PatricioYañez', password: '123456', role: 'docente' }
  ];

  constructor() {}

  // Método para iniciar sesión
  login(usuario: string, clave: string): boolean {
    const user = this.usuariosRegistrados.find(u => u.username === usuario && u.password === clave);
    if (user) {
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('usuario', user.username);
      sessionStorage.setItem('role', user.role);
      return true;
    }
    return false;
  }
  // Método para obtener el rol del usuario
  getUserRole(): string | null {
    const storedRole = sessionStorage.getItem('role');
    return storedRole ? storedRole : null;
  }

  // Verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return sessionStorage.getItem('loggedIn') === 'true';
  }

  // Método para cerrar sesión
  logout(): void {
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('role');
  }

  // Método para cambiar la contraseña del usuario
  cambiarClave(usuario: string, nuevaClave: string): boolean {
    const user = this.usuariosRegistrados.find(u => u.username === usuario);
    if (user) {
      user.password = nuevaClave;  // Actualizar la contraseña del usuario
      return true;
    }
    return false;
  }

  // Método para verificar la clave actual
  verificarClaveActual(usuario: string, claveActual: string): boolean {
    const user = this.usuariosRegistrados.find(u => u.username === usuario);
    return user ? user.password === claveActual : false;
  }
}