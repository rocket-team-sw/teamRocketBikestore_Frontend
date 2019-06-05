// Esta clase me permitirá manejar el servicio del usuario exclusivamente
// Además, mediante las peticiones HTTP, lograr manejar la información que recibe.
// *REVISAR EL TIPO DE GESTIÓN DE TABLEROS EN CUANTO A MOSTRAR LA INFORMACIÒN DE CADA UNO*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Revisar si estas URL son necesarias para la autenticación de cada ROL.
  // private userUrl = 'http://localhost:8080/api//auth/user';
  private serverURL = environment.serverUrl;
  private userURL = 'api/user/listAllUsers';
  private pmUrl = 'http://localhost:8080/api/test/pm';
  private adminUrl = 'http://localhost:8080/api/auth/admin';

  constructor(private http: HttpClient) { }
  // Estos métodos permiten coger la información de cada tipo de sesión y tener la capacidad
  // de mostrarlas en otra vista. (Revisar el ts de user)
  // Listar todos los usuarios.
  getUserBoard(): Observable<string> {
    return this.http.get(this.pmUrl, { responseType: 'text' });
  }

  getPMBoard(): Observable<string> {
    return this.http.get(this.pmUrl, { responseType: 'text' });
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }
}
