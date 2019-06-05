
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenStorageService } from 'app/shared/auth/token-storage.service';
import swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MaestrosService {

  // URL para la conexión, esta proviene del componente "environments"
  private API = environment.serverUrl;
  private empresaId = this.tokenStorage.getCompanyId();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // Declaramos una variable que me instancie el token de la sesión.
  token: TokenStorageService;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.isAuthenticated()
  }

  public getarea() {
    return this.http.get(this.API + 'areaPorEmpresa?empresaId=' + this.empresaId, this.httpOptions).toPromise()
  }

  public getAreasPorEmpresa(): Observable<any> {
    return this.http.get(this.API + 'areaPorEmpresa/?empresaId=' + this.empresaId, this.httpOptions);
  }

  public getProcesosPorEmpresa(): Observable<any> {
    return this.http.get(this.API + 'procesosPorEmpresa/?empresaId=' + this.empresaId, this.httpOptions);
  }

  public getSedesPorEmpresa(): Observable<any> {
    return this.http.get(this.API + 'sedesPorEmpresa/?empresaId=' + this.empresaId, this.httpOptions);
  }

  public getActividadesPorEmpresa(): Observable<any> {
    return this.http.get(this.API + 'actividadesPorEmpresa/?empresa=' + this.empresaId, this.httpOptions);
  }

  public getPotencialRiesgosPorEmpresa(): Observable<any> {
    return this.http.get(this.API + 'consultarPotencialRiesgoPorEmpresa/?idEmpresa=' + this.empresaId, this.httpOptions);
  }

  public getriesgos() {
    return this.http.get(this.API + 'rest/riesgos/' + this.empresaId + '/').toPromise()
      .catch((err) => {
        swal({
          title: 'Error!',
          text: 'Contacte al administrador del sistema',
          type: 'error',
          confirmButtonText: 'Cerrar'
        });
      });
  }

  /* Servicio Migrado */
  public getempleados(): Observable<any> {
    return this.http.get(this.API + 'api/user/empservice/' + this.empresaId, this.httpOptions);
  }

  /*
    public getempleados() {
      console.log('entró al servicio emp')
      return this.http.get(this.API + 'api/user/empservice/' + this.empresaId).toPromise()
        .catch((err) => {
          swal({
            title: 'Error!',
            text: 'Contacte al administrador del sistema',
            type: 'error',
            confirmButtonText: 'Cerrar'
          });
        });
    }
  */
  guardarCargo(modelo): Observable<any> {
    return this.http.post(this.API + 'crearCargo', modelo, this.httpOptions);
  }

  cargosPorempresa() {
    return this.http.get(this.API + 'cargosPorEmpresa/?empresa=' + this.empresaId, this.httpOptions);
  }

  /*Servicio Migrado*/
  public getcategoriaevento(): Observable<any> {
    return this.http.get(this.API + 'icas/' + this.empresaId + '/categoria', this.httpOptions)
  }

  /* Método Viejo
  public getcategoriaevento() {
    return this.http.get(this.API2 + 'rest/icas/' + this.empresaId + '/categoria').toPromise()
      .catch((err) => {
        swal({
          title: 'Error!',
          text: 'Contacte al administrador del sistema',
          type: 'error',
          confirmButtonText: 'Cerrar'
        });
      });
  }
  */

  /*Servicio Migrado*/
  public setcategoriaevento(parameters) {
    return this.http.post(this.API + 'icas/' + this.empresaId + '/categoria/create', parameters, this.httpOptions)
  }
  /* método viejo
  public setcategoriaevento(parameters) {
    let json = JSON.stringify(parameters);
    return this.http.post(this.API2 + 'rest/icas/' + this.empresaId + '/categoria/create', json, this.httpOptions);
  }
  */

  /* Servicio Migrado */
  public getevento(): Observable<any> {
    return this.http.get(this.API + 'icas/' + this.empresaId + '/evento', this.httpOptions)
  }

  /* método viejo
  public getevento() {
    return this.http.get(this.API2 + 'rest/icas/' + this.empresaId + '/evento').toPromise()
      .catch((err) => {
        swal({
          title: 'Error!',
          text: 'Contacte al administrador del sistema',
          type: 'error',
          confirmButtonText: 'Cerrar'
        });
      });
  }
  */

  public setevento(parameters) {
    let json = JSON.stringify(parameters);
    return this.http.post(this.API + 'icas/' + this.empresaId + '/evento/create', json, this.httpOptions);
  }

  /* Servicio Migrado */
  public gettipoformacion(): Observable<any> {
    return this.http.get(this.API + 'tipoformacion/' + this.empresaId, this.httpOptions);

  }

  /* Método viejo
  public gettipoformacion() {
    return this.http.get(this.API2 + 'rest/tipoformacion/' + this.empresaId + '/').toPromise()
      .catch((err) => {
        swal({
          title: 'Error!',
          text: 'Contacte al administrador del sistema',
          type: 'error',
          confirmButtonText: 'Cerrar'
        });
      });
  }
*/
  /* Método viejo
    public settipoformacion(parameters) {
      let json = JSON.stringify(parameters);
      return this.http.post(this.API2 + 'rest/tipoformacion/' + this.empresaId + '/create', json, this.httpOptions);
    }*/

  /*Migración Servicio */
  public settipoformacion(parameters): Observable<any> {
    console.log('entró al servicio de formacion con ', parameters)
    return this.http.post(this.API + 'tipoformacion/' + this.empresaId + '/create', parameters, this.httpOptions);
  }

  public getActividad(): Observable<any> {
    return this.http.post(this.API + 'tipoformacion/formacion/' + this.empresaId, this.httpOptions);
  }

  /* Método viejo
  public getActividad() {
    return this.http.get(this.API2 + 'rest/tipoformacion/' + this.empresaId + '/').toPromise()
      .catch((err) => {
        swal({
          title: 'Error!',
          text: 'Contacte al administrador del sistema',
          type: 'error',
          confirmButtonText: 'Cerrar'
        });
      });
  }
  */

  public setActividad(parameters) {
    const json = JSON.stringify(parameters);
    return <any> this.http.post(this.API + 'crearActividad', json, this.httpOptions);

  }

  public actualizaractividad(parameters) {
    const json = JSON.stringify(parameters);
    return this.http.put(this.API + 'actualizarActividad', json, this.httpOptions);
  }

  public eliminar_actividad(idActividad): Observable<any> {
    return this.http.delete(this.API + 'eliminarActividad/?idActividad=' + idActividad, this.httpOptions);
  }

  public setproceso(parameters) {
    const json = JSON.stringify(parameters);
    return this.http.post(this.API + 'crearProceso', json, this.httpOptions);
  }

  public actualizarproceso(parameters) {
    const json = JSON.stringify(parameters);
    return this.http.put(this.API + 'actualizarProceso', json, this.httpOptions);
  }

  public guardar_proceso_masivo(parameters) {
    const json = JSON.stringify(parameters);
    return this.http.post(this.API + 'crearProcesoMasivo', json, this.httpOptions).toPromise()
      .catch((err) => {
        swal({
          title: 'Error!',
          text: 'Contacte al administrador del sistema',
          type: 'error',
          confirmButtonText: 'Cerrar'
        });
      });
  }

  public eliminar_proceso(idProceso): Observable<any> {
    return this.http.delete(this.API + 'eliminarProceso/?idProceso=' + idProceso, this.httpOptions);
  }
  public setsede(parameters): Observable<any> {
    const json = JSON.stringify(parameters);
    return this.http.post(this.API + 'crearSede', json, this.httpOptions);
  }

  public actualizarsede(parameters) {
    const json = JSON.stringify(parameters);
    return this.http.put(this.API + 'actualizarSede', json, this.httpOptions);
  }

  public eliminar_sede(idSede): Observable<any> {
    return this.http.delete(this.API + 'eliminarSede/?idSede=' + idSede, this.httpOptions);
  }

  public guardar_sede_masivo(parameters) {
    const json = JSON.stringify(parameters);
    return this.http.post(this.API + 'crearSedeMasivo', json, this.httpOptions).toPromise()
      .catch((err) => {
        swal({
          title: 'Error!',
          text: 'Contacte al administrador del sistema',
          type: 'error',
          confirmButtonText: 'Cerrar'
        });
      });
  }

  public setarea(parameters) {
    const json = JSON.stringify(parameters);
    return this.http.post(this.API + 'crearArea', json, this.httpOptions);
  }

  public actualizararea(parameters) {
    const json = JSON.stringify(parameters);
    return this.http.put(this.API + 'actualizarArea', json, this.httpOptions);
  }

  public eliminar_area(idArea): Observable<any> {
    return this.http.delete(this.API + 'eliminarArea/?idArea=' + idArea, this.httpOptions);
  }

  public guardar_area_masivo(parameters) {
    const json = JSON.stringify(parameters);
    return this.http.post(this.API + 'crearAreaMasivo', json, this.httpOptions).toPromise()
      .catch((err) => {
        swal({
          title: 'Error!',
          text: 'Contacte al administrador del sistema',
          type: 'error',
          confirmButtonText: 'Cerrar'
        });
      });
  }

  public setpotencialriesgo(parameters): Observable<any> {
    const json = JSON.stringify(parameters);
    return this.http.post(this.API + 'crearPotencialRiesgo', json, this.httpOptions);
  }

  public actualizarpotencialriesgo(parameters): Observable<any> {
    const json = JSON.stringify(parameters);
    return this.http.put(this.API + 'actualizarPotencialRiesgo', json, this.httpOptions);
  }

  public eliminar_potencialriesgo(id): Observable<any> {
    return this.http.delete(this.API + 'eliminarPotencialRiesgo/?id=' + id, this.httpOptions);
  }

  public consultarNombrePlantillas(): Observable<any> {
    return this.http.get(this.API + 'nombrePlantillas/?idEmpresa=' + this.empresaId, this.httpOptions);
  }



  /*Servicio Migrado*/
  public setemp(parameters) {
    console.log('entró a agregar empleados')
    const json = JSON.stringify(parameters);
    return this.http.post(this.API + 'empleados/' + this.empresaId + '/create', json, this.httpOptions);
  }

  /* Servicio Migrado */
  public setempmax(parameters): Observable<any> {
    return this.http.post(this.API + 'empleados/' + this.empresaId + '/createmax', parameters, this.httpOptions);
  }

  /* Método Anterior
  public setempmax(parameters) {
    let json = JSON.stringify(parameters);
    return this.http.post(this.API + 'rest/empleados/' + this.empresaId + '/createmax', json, this.httpOptions);
  } */

  public setareamax(parameters) {
    let json = JSON.stringify(parameters);
    return this.http.post(this.API + 'rest/areas/' + this.empresaId + '/createmax', json, this.httpOptions);
  }

  public setusuario(parameters) {
    let json = JSON.stringify(parameters);
    return this.http.post(this.API + 'rest/usuarios/' + this.empresaId + '/create', json, this.httpOptions);
  }

  async buildHeaderAuthenticated() {
    // const token = this.tokenStorage.getToken();
    this.httpOptions = {
      headers: await new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.tokenStorage.getToken() + '',
      })
    };
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
