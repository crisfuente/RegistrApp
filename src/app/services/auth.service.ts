import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Lista de usuarios registrados (esto normalmente sería una base de datos)
  private usuariosRegistrados = [
    { username: 'Usuario1', password: 'MiClav3' }
  ];

  constructor() {}

  // Método para iniciar sesión
  login(usuario: string, clave: string): boolean {
    const user = this.usuariosRegistrados.find(u => u.username === usuario && u.password === clave);
    return !!user; // Retorna true si las credenciales coinciden, de lo contrario false
  }

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('loggedIn');
  }

  // Método para registrar un nuevo usuario
  registrar(usuario: string, clave: string): boolean {
    const existe = this.usuariosRegistrados.find(u => u.username === usuario);
    if (existe) {
      return false; // El usuario ya existe, retorno de error
    } else {
      this.usuariosRegistrados.push({ username: usuario, password: clave });
      return true; // Registro exitoso
    }
  }

  // Método para cambiar la contraseña de un usuario sin requerir la clave antigua
  cambiarClave(usuario: string, nuevaClave: string): boolean {
    const user = this.usuariosRegistrados.find(u => u.username === usuario);
    if (user) {
      user.password = nuevaClave; // Actualiza la contraseña
      return true; // Cambio de contraseña exitoso
    }
    return false; // Usuario no encontrado
  }
}
