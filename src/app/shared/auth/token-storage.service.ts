
// Clase que me permitirá verificar si el token existe y con qué información.
// Tener en cuenta también que este método me permitirá manejar las tokens como se necesite.
// REVISAR LA GESTIÓN DE LOS PLANES PARA CADA TIPO DE ROL
import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const AUTHORITIES_ID = 'AuthId';
const AUTHORITIES_COMPANY_ID = 'companyId';
const AUTHORITIES_COMPANY_NAME = 'companyName'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  // Declaramos una variable que nos indique que sólo hay un rol por usuario.
  private roles: string;
  // private roles: Array<string> = [];
  constructor() { }

  // Para desloguear, simplemente hacemos un barrido de la sessionStorage que es la que contiene el token.
  signOut() {
    window.sessionStorage.clear();
  }
  // Hacemos un set del token para iniciar la sesión, pero primero limpiamos el token que tenga en el momento.
  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  // Con este método puedo agarrar en cualquier parte el token de la sesión.
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  // Este será el email del usuario.
  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }
  // Seteando el id del usuario para el tokenStorage
  public saveID(id: string) {
    window.sessionStorage.removeItem(AUTHORITIES_ID);
    window.sessionStorage.setItem(AUTHORITIES_ID, id);
  }
  // Obtenemos el id del usuario para el tokenStorage
  public getId(): string {
    return sessionStorage.getItem(AUTHORITIES_ID);
  }
  // Seteando el id del usuario para el tokenStorage
  public saveIdCompany(id: string) {
    window.sessionStorage.removeItem(AUTHORITIES_COMPANY_ID);
    window.sessionStorage.setItem(AUTHORITIES_COMPANY_ID, id);
  }
  // Obtenemos el id del usuario para el tokenStorage
  public getCompanyId(): string {
    return sessionStorage.getItem(AUTHORITIES_COMPANY_ID);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  // este me tiene que guardar los permisos del usuario para poder asociarlo luego con las vistas.
  public saveAuthorities(authorities: string) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, authorities);
  }
  public saveCompanyName(name: string) {
    window.sessionStorage.removeItem(AUTHORITIES_COMPANY_NAME);
    window.sessionStorage.setItem(AUTHORITIES_COMPANY_NAME, name);
  }

  public getCompanyName(): string {
    return sessionStorage.getItem(AUTHORITIES_COMPANY_NAME);
  }

  // Sólo vamos a retornar un rol.
  public getAuthorities(): string {
    try {
      if (sessionStorage.getItem(TOKEN_KEY)) {
        return sessionStorage.getItem(AUTHORITIES_KEY);
      }
    } catch (error) {
    }
  }
}
