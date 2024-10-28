import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuariosRegistrados: { username: string, password: string }[] = [];

  constructor() {
    // Cargar usuarios desde localStorage al iniciar el servicio
    const usuariosGuardados = localStorage.getItem('usuariosRegistrados');
    this.usuariosRegistrados = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
  }

  // Método para iniciar sesión
  login(usuario: string, clave: string): boolean {
    const user = this.usuariosRegistrados.find(u => u.username === usuario && u.password === clave);
    if (user) {
      localStorage.setItem('loggedIn', 'true'); // Guardar estado de autenticación
      return true; // Inicio de sesión exitoso
    }
    return false; // Credenciales incorrectas
  }

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('loggedIn'); // Eliminar estado de autenticación
  }

  // Método mejorado para registrar un nuevo usuario
  registrar(usuario: string, clave: string): boolean {
    const existe = this.usuariosRegistrados.some(u => u.username === usuario);
    if (existe) {
      return false; // El usuario ya existe, retorno de error
    } else {
      this.usuariosRegistrados.push({ username: usuario, password: clave });
      this.guardarUsuarios(); // Guardar en localStorage
      return true; // Registro exitoso
    }
  }

  // Método para cambiar la contraseña de un usuario sin requerir la clave antigua
  cambiarClave(usuario: string, nuevaClave: string): boolean {
    const user = this.usuariosRegistrados.find(u => u.username === usuario);
    if (user) {
      user.password = nuevaClave; // Actualiza la contraseña
      this.guardarUsuarios(); // Guardar cambios en localStorage
      return true; // Cambio de contraseña exitoso
    }
    return false; // Usuario no encontrado
  }

  // Método para guardar la lista de usuarios en localStorage
  private guardarUsuarios(): void {
    localStorage.setItem('usuariosRegistrados', JSON.stringify(this.usuariosRegistrados));
  }
}
