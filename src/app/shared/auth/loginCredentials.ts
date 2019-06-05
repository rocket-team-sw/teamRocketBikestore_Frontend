
// Clase contenedora para las credenciales del login.
export class LoginCredentials {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
