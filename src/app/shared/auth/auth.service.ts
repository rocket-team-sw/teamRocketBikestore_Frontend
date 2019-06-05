import { Params } from '@angular/router';
import { LoginPageComponent } from './../../pages/content-pages/login/login-page.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtResponse } from './jwt-response';
import { LoginCredentials } from './loginCredentials';
import { SignUpInfo } from './signUp-info';
import { environment } from './../../../environments/environment.prod';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Encabezados de las peticiones http con la información de la aplicación.

// Verificar esto.
@Injectable({ providedIn: 'root' })

export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // Declaramos una variable que me instancie el token de la sesión.
  token: TokenStorageService;
  loginComponent: LoginPageComponent;
  // URL para la conexión, esta proviene del componente "environments"
  private serverURL = environment.serverUrl;

  // Debemos inyectar el httpClient dentro del constructor y de esta manera poder hacer las peticinos API REST
  constructor(private http: HttpClient,
    private tokenStorage: TokenStorageService) {
    this.isAuthenticated()
  }

  async buildHeaderAuthenticated() {
    // const token = this.tokenStorage.getToken();
    this.httpOptions = {
      headers: await new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.tokenStorage.getToken() + ''
      })
    };
  }

  /*************************** Servicios Usuario ***************************/
  // Obtener los usuarios para ROLE_SUPER
  obtenerUsuariosSuper(): Observable<any> {
    return this.http.get(this.serverURL + 'api/user/super/listAllUsers', this.httpOptions);
  }

  // Obtener los usuarios para ROLE_ADMIN
  obtenerUsuariosAdmin(): Observable<any> {
    return this.http.get(this.serverURL + 'api/user/admin/listAllUsers', this.httpOptions);
  }

  // Obtener un sólo usuario pasándole el id como criterio.
  listarUsuario(id): Observable<any> {
    return this.http.get(this.serverURL + 'api/user/super/findOneUser/?idUsuario=' + id, this.httpOptions);

  }
  // Eliminar usuarios, debe recibir el correo el cual quiere eliminar.
  eliminarUsuarios(email): Observable<any> {
    return this.http.delete(this.serverURL + 'api/user/delete/?correo=' + email, this.httpOptions);
  }
  // Actualización de los usuarios, pasándole todos los parámetros.
  actualizarDatos(infoUpdate): Observable<any> {
    return this.http.post<string>(this.serverURL + 'api/user/update', infoUpdate, this.httpOptions);

  }
  // Hacemos el post del registrar, debemos pasarle el path de la url cada vez que consumamos un nuevo servicio.
  signupUser(path, info: SignUpInfo, companyName): Observable<any> {
    return this.http.post<any>(`${this.serverURL}${path}`, info, { headers: this.httpOptions.headers, params: companyName });
  }
  // Acá se tendrá en cuenta entonces la clase LoginCredentials para las credenciales de inicio de sesión
  signinUser(email: string, password: string) {
  }

  // Emparejamiento de perfiles.
  toPairUserProfile(path, pairUserInfo): Observable<any> {
    return this.http.post(`${this.serverURL}${path}`, pairUserInfo, this.httpOptions);
  }

  // Listar los perfiles del usuario seleccionado.
  listProfileUser(id): Observable<any> {
    return this.http.get(this.serverURL + 'api/profile/listProfileUser?idUser=' + id, this.httpOptions);
  }

  // Cambiar la contraseña de un usuario recibiendo el id, contraseña vieja y contraseña nueva dentro de passwordInfoUpdate
  changePassword(path, passwordInfoUpdate): Observable<any> {
    return this.http.post(`${this.serverURL}${path}`, passwordInfoUpdate, this.httpOptions);
  }

  /*************************** Servicios Módulos ***************************/
  // Creación del módulo pasándole una información básica.
  createModule(moduleInfo): Observable<any> {
    return this.http.post<any>(this.serverURL + 'api/module/create', moduleInfo, this.httpOptions);
  }
  // Listar Módulos como Súper Administador
  listarModulos(): Observable<any> {
    return this.http.get<any>(this.serverURL + 'api/module/listAll', this.httpOptions);
  }
  // Listar Módulos como Administrador
  listarModulosAdmin(): Observable<any> {
    return this.http.get<any>(this.serverURL + 'api/module/admin/listMyModules', this.httpOptions);
  }
  // Ver Detalles del módulo pasándole el id como criterio.
  ListDetailModule(id): Observable<any> {
    return this.http.get<any>(this.serverURL + 'api/module/detailModule?idModule=' + id, this.httpOptions);
  }
  // Actualización de Módulos pasándole el formulario con los datos actualizados.
  updateModule(infoUpdateModule): Observable<any> {
    return this.http.post<any>(this.serverURL + 'api/module/update', infoUpdateModule, this.httpOptions);
  }
  // Eliminar un Módulo pasándole un id como criterio.
  deleteModule(id): Observable<any> {
    return this.http.delete(this.serverURL + 'api/module/delete?id=' + id, this.httpOptions);
  }
  // Emparejamiento con el menu hijo, se le pasará tanto el id del menú como el del módulo padre.
  toPairMenu(path, pairModuleInfo): Observable<any> {
    return this.http.post(`${this.serverURL}${path}`, pairModuleInfo, this.httpOptions);
  }
  // Listar los menus del módulo.
  listMenuModule(id): Observable<any> {
    return this.http.get(this.serverURL + 'api/module/listMenuModules?idModule=' + id, this.httpOptions);
  }
  // Desemparejar el menú del módulo.
  unpairModuleMenu(path, unpairModuleInfo): Observable<any> {
    return this.http.post(`${this.serverURL}${path}`, unpairModuleInfo, this.httpOptions);
  }

  // Carga dinámica module menu
  dynamicLoadModuleMenu(): Observable<any> {
    return this.http.get(this.serverURL + 'api/module/jsonModuleMenu', this.httpOptions);
  }

  /*************************** Servicios Menú ***************************/
  // Crear los menú
  createMenu(menuInfo): Observable<any> {
    return this.http.post<any>(this.serverURL + 'api/menu/create', menuInfo, this.httpOptions);
  }
  // Listar menús.
  listMenu(): Observable<any> {
    return this.http.get<any>(this.serverURL + 'api/menu/listAll', this.httpOptions);
  }
  // Ver Detalles del menú
  ListDetailMenu(id): Observable<any> {
    return this.http.get<any>(this.serverURL + 'api/module/detailModule?idModule=' + id, this.httpOptions);
  }
  // Actualización de Menú
  updateMenu(infoUpdateModule): Observable<any> {
    return this.http.post<any>(this.serverURL + 'api/module/update', infoUpdateModule, this.httpOptions);
  }
  // Eliminar un Menú
  deleteMenu(id): Observable<any> {
    return this.http.get(this.serverURL + 'api/menu/delete?id=' + id, this.httpOptions);
  }


  /*************************** Servicios Perfiles ***************************/

  // Creación del módulo pasándole una información básica.
  createProfile(path, profileInfo): Observable<any> {
    return this.http.post<any>(`${this.serverURL}${path}`, profileInfo, this.httpOptions);
  }
  // Listar Perfiles para ROLE_SUPER.
  listarPerfiles(): Observable<any> {
    return this.http.get<any>(this.serverURL + 'api/profile/listAll', this.httpOptions);
  }

  listarPerfilesAdmin(): Observable<any> {
    return this.http.get<any>(this.serverURL + 'api/profile/admin/listAllMyProfiles', this.httpOptions);
  }
  // Ver el detalle de los perfiles recibiendo el id como criterio.
  ListDetailProfile(id): Observable<any> {
    return this.http.get<any>(this.serverURL + 'api/profile/detailProfile?idProfile=' + id, this.httpOptions);
  }
  // Actualización de Planes pasándole el formulario con los datos actualizados.
  updateProfile(path, infoUpdateProfile): Observable<any> {
    return this.http.post<any>(`${this.serverURL}${path}`, infoUpdateProfile, this.httpOptions);
  }
  // Eliminar un plan pasándole un id como criterio.
  deleteProfile(id): Observable<any> {
    return this.http.get(this.serverURL + 'api/profile/delete?id=' + id, this.httpOptions);
  }

  // Listar módulos por perfil.
  listModuleProfile(id): Observable<any> {
    return this.http.get(this.serverURL + 'api/profile/listModuleProfile?idProfile=' + id, this.httpOptions);
  }

  // Emparejamiento con Módulos.
  toPairModuleProfile(path, pairProfileInfo): Observable<any> {
    return this.http.post(`${this.serverURL}${path}`, pairProfileInfo, this.httpOptions);
  }

  // Desemparejamiento de módulos del perfil.
  unpairProfileModule(path, unpairProfileInfo): Observable<any> {
    return this.http.post(`${this.serverURL}${path}`, unpairProfileInfo, this.httpOptions);
  }



  /*************************** Servicios Planes ***************************/

  // Creación del plan.
  createPlan(path, infoPlan): Observable<any> {
    return this.http.post<any>(`${this.serverURL}${path}`, infoPlan, this.httpOptions);
  }
  // Listar Planes para ROLE_SUPER.
  listarPlanes(): Observable<any> {
    return this.http.get<any>(this.serverURL + 'api/plan/listAll', this.httpOptions);
  }
  // Ver Detalles del plan pasándole el id como criterio.
  ListDetailPlan(id): Observable<any> {
    return this.http.get<any>(this.serverURL + 'api/plan/detailPlan?idPlan=' + id, this.httpOptions);
  }
  // Actualización de Planes pasándole el formulario con los datos actualizados.
  updatePlan(infoUpdatePlan, path): Observable<any> {
    return this.http.post<any>(`${this.serverURL}${path}`, infoUpdatePlan, this.httpOptions);
  }
  // Eliminar un plan pasándole un id como criterio.
  deletePlan(id): Observable<any> {
    return this.http.delete(this.serverURL + 'api/plan/delete?id=' + id, this.httpOptions);
  }
  // Emparejamiento con el módulo hijo, se le pasará tanto el id del menú como el del módulo padre.
  toPairModule(path, pairPlanInfo): Observable<any> {
    return this.http.post(`${this.serverURL}${path}`, pairPlanInfo, this.httpOptions);
  }

  // Desemparejamiento
  // Desemparejar el menú del módulo.
  unpairModulePlan(path, unpairPlanInfo): Observable<any> {
    return this.http.post(`${this.serverURL}${path}`, unpairPlanInfo, this.httpOptions);
  }

  // Listar los menus del módulo.
  listModulesPlan(id): Observable<any> {
    return this.http.get(this.serverURL + 'api/plan/listModulesPlan?idPlan=' + id, this.httpOptions);
  }










  logout() {
    this.token = null;
  }

  getToken() {
    return this.token;
  }
  // getAllUsers(): Observable<string> {
  // console.log('entra al board');
  // return this.http.get(this.serverURL + this.userURL, this.httpOptions);
  // }

  // Haremos un observable de la clase JWTResponse para mostrar los datos de esta.
  // Es importante indicarle al método que devolverá un Observable y el tipo de dato que devolverá el observable
  // al hacer el subscribe, si el api rest devuelve un objeto que no corresponde 100% con los modelos que tengas
  // en Angular, es mejor indicarle el tipo any.
  // Dentro del loginPageComponent se encuentra el método subscribe en el cual recibe en su data la información
  // del token por medio de este observable de tipo JWTResponse
  attemptAuth(path, credentials: LoginCredentials): Observable<JwtResponse> {
    console.log('ingresó a la verificación del token');
    // Recordar que los "post" tienen un cuerpo con el qué comunicarse.
    return this.http.post<JwtResponse>(`${this.serverURL}${path}`, credentials, this.httpOptions);
  }

  isAuthenticated() {
    // here you can check if user is authenticated or not through his token
    if (this.tokenStorage.getToken() != null) {
      this.buildHeaderAuthenticated();
      return true;
    } else {
      this.buildHeaderAuthenticated();
      return false;
    }
  }
}
