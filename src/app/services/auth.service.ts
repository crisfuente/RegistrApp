import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Usuarios almacenados con rol
  private usuariosRegistrados: { username: string, password: string, role: string }[] = [];

  constructor() {
    // Cargar usuarios registrados desde localStorage
    const usuariosGuardados = localStorage.getItem('usuariosRegistrados');
    this.usuariosRegistrados = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
  }

  // Método para iniciar sesión
  async login(usuario: string, clave: string): Promise<boolean> {
    const user = this.usuariosRegistrados.find(u => u.username === usuario && u.password === clave);
    if (user) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('usuario', usuario);
      localStorage.setItem('role', user.role);
      return true;
    }
    return false;
  }

  // Obtener el rol del usuario autenticado
  getUserRole(usuario: string): string | null {
    const user = this.usuariosRegistrados.find(u => u.username === usuario);
    return user ? user.role : null;
  }

  // Verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('usuario');
    localStorage.removeItem('role');
  }

  // Registrar un nuevo usuario con rol
  registrar(usuario: string, clave: string, role: string): boolean {
    const existe = this.usuariosRegistrados.some(u => u.username === usuario);
    if (existe) {
      return false; // Usuario ya existe
    } else {
      this.usuariosRegistrados.push({ username: usuario, password: clave, role });
      this.guardarUsuarios(); // Guardar en localStorage
      return true;
    }
  }

  // Cambiar la contraseña del usuario
  cambiarClave(usuario: string, nuevaClave: string): boolean {
    const user = this.usuariosRegistrados.find(u => u.username === usuario);
    if (user) {
      user.password = nuevaClave;
      this.guardarUsuarios();
      return true;
    }
    return false;
  }

  // Guardar usuarios en localStorage
  private guardarUsuarios(): void {
    localStorage.setItem('usuariosRegistrados', JSON.stringify(this.usuariosRegistrados));
  }
}
