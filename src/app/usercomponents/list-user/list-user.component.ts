import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AuthService } from 'app/shared/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'app/shared/auth/token-storage.service';
import swal from 'sweetalert2';
import { UpdateUserComponent } from '../crud-user/update-user/update-user.component';
import { CreateUserComponent } from '../crud-user/create-user/create-user.component';
import { ToPairProfileComponent } from '../to-pair-profile/to-pair-profile.component';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  rows = [];
  temp: string[];
  board: string;
  errorMessage: string;
  dato: any;
  info: any;
  button = [];
  email: any;
  isSignedUp = false;
  isSignUpFailed = false;
  nombreEmpresa: any;


  // Table Column Titles
  columns = [
    { prop: 'name' },
    { name: 'id' },
    { prop: 'email' }
  ];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private authService: AuthService,
    private modalService: NgbModal, private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    this.configPage();
    this.nombreEmpresa = this.tokenStorage.getCompanyName();
  }

  configPage() {
    // Obtendremos los usuarios a partir del servicio SUPER o ADMIN
    if (this.tokenStorage.getAuthorities() === 'ROLE_SUPER') {
      this.authService.obtenerUsuariosSuper().subscribe(
        data => {
          if (data.code === 200) {
            this.dato = JSON.parse(JSON.stringify(data.answerList));
            this.temp = [...this.dato];
            this.rows = this.dato;
          }
          if (data.code === 400) {
            swal({ type: 'warning', text: data.answer })
          }
        },
        error => {
          this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
        }
      );
    } else {
      this.authService.obtenerUsuariosAdmin().subscribe(
        data => {
          if (data.code === 200) {
            this.dato = JSON.parse(JSON.stringify(data.answerList));
            this.temp = [...this.dato];
            this.rows = this.dato;
          }
          if (data.code === 400) {
            swal({ type: 'warning', text: data.answer })
          }
        },
        error => {
          this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
        }
      );
    }
  }

  // Método que me permite filtrar los datos dentro de la tabla.
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d: any) {
      if (d.name) {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
      }
      if (d.email) {
        return d.email.toLowerCase().indexOf(val) !== -1 || !val;
      } else {
        return false;
      }
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  // ********CRUD USER**************//

  // Listar un sólo usuario con el criterio de id
  onList(id) {
    let activatedPlan;
    let role;
    this.authService.listarUsuario(id).subscribe(
      data => {
        JSON.parse(JSON.stringify(data));
        if (data.code === 200) {
          console.log('Se está listando el detalle exitosamente')
          // Validación del campo null en el plan.
          if (data.nameActivatedPlan === null) {
            activatedPlan = 'Sin Asignar'
          } else {
            activatedPlan = data.genericObject.nameActivatedPlan;
          }
          // Validación del rol
          if (data.genericObject.userAux.role === 'ROLE_ADMIN') {
            role = 'Administrador';
          } else {
            role = 'Usuario'
          }
          // htmlcontent para el sweetalert
          const htmlcontent = '<div class="col-lg-6 col-md-8 col-sm-12 float-left">'
            + '<div class="card">'
            + '<div class="card-body">'
            + '<ul class="list-group">'
            + '<li class="list-group-item">'
            + '<span></span> ID de Usuario: ' + data.genericObject.userAux.userId
            + '</li>'
            + '<li class="list-group-item">'
            + '<span></span> Nombre Completo: ' + data.genericObject.userAux.name
            + '</li>'
            + '<li class="list-group-item">'
            + '<span></span> Email de Usuario: ' + data.genericObject.userAux.email
            + '</li>'
            + '<li class="list-group-item">'
            + '<span></span> Nombre de Usuario: ' + data.genericObject.userAux.userName
            + '</li>'
            + '<li class="list-group-item">'
            + '<span></span> Nombre Creador: ' + data.genericObject.nameCreator
            + '</li>'
            + '<li class="list-group-item">'
            + '<span></span> Fecha de Creación: ' + data.genericObject.userAux.createDate
            + '</li>'
            + '</ul>'
            + '</div>'
            + '</div>'
            + '</div>'

            + '<div class="col-lg-6 col-md-8 col-sm-12 float-right">'
            + '<div class="card">'
            + '<div class="card-body">'
            + '<ul class="list-group">'
            + '<li class="list-group-item">'
            + '<span></span> Teléfono de Usuario: ' + data.genericObject.userAux.phone
            + '</li>'
            + '<li class="list-group-item">'
            + '<span class="badge bg-info float-right"></span> Dirección de Usuario: ' + data.genericObject.userAux.address
            + '</li>'
            + '<li class="list-group-item">'
            + '<span class="badge bg-warning float-right"></span> Tipo de Documento: ' + data.genericObject.userAux.documentType
            + '</li>'
            + '<li class="list-group-item">'
            + '<span class="badge bg-success float-right"></span> Número de Documento: ' + data.genericObject.userAux.documentNumber
            + '</li>'
            + '<li class="list-group-item">'
            + '<span class="badge bg-danger float-right"></span> Rol de Usuario: ' + role
            + '</li>'
            + '<li class="list-group-item">'
            + '<span class="badge bg-danger float-right"></span> Nombre de la Compañía: ' + data.genericObject.nameCompany
            + '</li>'
            + '<li class="list-group-item">'
            + '<span class="badge bg-danger float-right"></span> Plan Activado: ' + activatedPlan
            + '</li>'
            + '</ul>'
            + '</div>'
            + '</div>'
            + '</div>'
          swal({
            title: 'Datos De Usuario',
            width: 1100,
            html: htmlcontent,
          });
        }
        if (data.code === 400) {
          swal({ type: 'error', text: data.answer })
        }
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

  // Actualización de Usuario.
  onUpdateUser(id) {
    let userInfoUpdate = {
      'userId': id,
      'name': '',
      'email': '',
      'userName': '',
      'address': '',
      'role': '',
      'phone': '',
      'documentType': '',
      'documentNumber': '',
      'nameCompany': '',
      'activatedPlan': '',
    }
    this.authService.listarUsuario(id).subscribe(
      data => {
        this.info = JSON.parse(JSON.stringify(data));
        userInfoUpdate = {
          'userId': id,
          'name': this.info.genericObject.userAux.name,
          'email': this.info.genericObject.userAux.email,
          'userName': this.info.genericObject.userAux.userName,
          'address': this.info.genericObject.userAux.address,
          'role': this.info.genericObject.userAux.role,
          'phone': this.info.genericObject.userAux.phone,
          'documentType': this.info.genericObject.userAux.documentType,
          'documentNumber': this.info.genericObject.userAux.documentNumber,
          'nameCompany': this.info.genericObject.nameCompany,
          'activatedPlan': this.info.genericObject.userAux.activatedPlan
        }
        console.log('listarUsuario', this.info.genericObject.userAux.activatedPlan)
        const modalRef = this.modalService.open(UpdateUserComponent, {
          windowClass: '', size: 'lg',
        });
        // Enviamos la información al modal hijo.
        modalRef.componentInstance.userInfoUpdate = userInfoUpdate;
        // Recibimos la información del modal hijo.
        modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
          swal({
            title: '¿Está seguro que desea confirmar la actualización?',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            type: 'warning'
          }).then((result) => {
            if (result.value) {
              this.authService.actualizarDatos(receivedEntry).subscribe(
                data => {
                  if (data.code === 200) {
                    JSON.parse(JSON.stringify(data));
                    this.configPage();
                    this.modalService.dismissAll();
                    swal({ type: 'success', text: 'Actualización Completada' })
                  }
                  if (data.code === 400) {
                    swal({
                      type: 'error',
                      text: data.answer
                    })
                  }
                }, error => {
                  this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
                })
            }
          });
        })
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

  // Método de eliminación, llamará al servicio eliminar.
  onDelete(email) {
    this.authService.eliminarUsuarios(email).subscribe(
      data => {
        console.log('respuesta', data)
        if (data.code === 200) {
          this.configPage();
        }
        if (data.code === 400) {
          swal({ type: 'error', text: data.answer })
        }
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }
  // Creación del usuario.
  openRegister() {
    // const url = 'api/user/create';
    const modalRef = this.modalService.open(CreateUserComponent, {
      windowClass: 'modal', size: 'lg'
    });
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry === 'Usuario Registrado') {
        this.configPage();
      } else {
        return false;
      }
    })
  }

  // Emparejamiento de perfiles para el usuario.
  toPairProfile(id) {
    let userInfoUpdate = {
      'id': id,
      'name': ''
    }
    this.authService.listarUsuario(id).subscribe(
      data => {
        if (data.code === 200) {
          this.info = JSON.parse(JSON.stringify(data.genericObject));
          userInfoUpdate = {
            'id': id,
            'name': this.info.userAux.name
          }
          const modalRef = this.modalService.open(ToPairProfileComponent, {
            windowClass: '', size: 'lg',
          });
          // Enviamos la información al modal hijo.
          modalRef.componentInstance.userInfoUpdate = userInfoUpdate;
        
        }
        if (data.code === 400) {
          swal({ type: 'error', text: data.answer })
        }
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }

  // Método para sacar el sweetAlert con la confirmación de la eliminación.
  deleteWarning(email) {
    event.preventDefault(); // prevent form submit
    swal({
      title: '¿Está seguro que desea eliminar el registro?',
      text: 'No podrá recuperar el registro luego',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.onDelete(email);
        swal(
          'El usuario ' + email,
          'ha sido eliminado exitosamente.',
          'success'
        )
      }
    })
  }

}
