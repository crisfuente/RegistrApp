import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Nueva estructura de usuario con el campo correo incluido
  private usuariosRegistrados: { 
    username: string, 
    password: string, 
    role: string, 
    nombre: string, 
    apellido: string, 
    edad: number, 
    rut: string, 
    fechaNacimiento: string, 
    correo: string 
  }[] = [];

  constructor() {
    // Cargar los usuarios registrados desde `localStorage` al iniciar el servicio
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

  // Obtener el rol del usuario
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

  // Registrar un nuevo usuario con todos los datos requeridos
  registrar(usuario: {
    nombre: string,
    apellido: string,
    edad: number,
    rut: string,
    fechaNacimiento: string,
    clave: string,
    rol: string,
    correo: string
  }): boolean {
    const existe = this.usuariosRegistrados.some(u => u.username === usuario.nombre);
    if (existe) {
      return false;
    } else {
      // Agregar el nuevo usuario con el correo incluido
      this.usuariosRegistrados.push({ 
        username: usuario.nombre, 
        password: usuario.clave, 
        role: usuario.rol, 
        nombre: usuario.nombre, 
        apellido: usuario.apellido, 
        edad: usuario.edad, 
        rut: usuario.rut, 
        fechaNacimiento: usuario.fechaNacimiento, 
        correo: usuario.correo
      });
      this.guardarUsuarios();
      return true;
    }
  }

  // Método para verificar la contraseña actual del usuario
  verificarClaveActual(usuario: string, claveActual: string): boolean {
    const user = this.usuariosRegistrados.find(u => u.username === usuario);
    return user ? user.password === claveActual : false;
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

  // Guardar la lista de usuarios en `localStorage`
  private guardarUsuarios(): void {
    localStorage.setItem('usuariosRegistrados', JSON.stringify(this.usuariosRegistrados));
  }
}
