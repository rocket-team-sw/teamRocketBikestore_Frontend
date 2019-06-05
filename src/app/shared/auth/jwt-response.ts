// Esta clase se debería encargar de los datos que tiene la respuesta del token.
// Por el momento crearemos las variables que me reciba el token y el usuario.
export class JwtResponse {
  token: string;
  user: any;
  role: string;

  constructor(token: string, user: any, role: string) {
    this.token = token;
    this.user = user;
    this.role = role;
  }
}
