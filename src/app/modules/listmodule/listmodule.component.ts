import { text } from '@angular/core/src/render3';
import { ModulesModule } from './../modules.module';
import { TokenStorageService } from './../../shared/auth/token-storage.service';
import { AuthService } from './../../shared/auth/auth.service';
import { transition } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translateXY } from '@swimlane/ngx-datatable/release/utils';
import { DetailmoduleComponent } from '../detailmodule/detailmodule.component';
import swal from 'sweetalert2';
import { UpdatemoduleComponent } from '../updatemodule/updatemodule.component';
import { CreateonlyModuleComponent } from '../createonly-module/createonly-module.component';
import { ToPairMenuComponent } from '../to-pair-menu/to-pair-menu.component';

@Component({
  selector: 'app-listmodule',
  templateUrl: './listmodule.component.html',
  styleUrls: ['./listmodule.component.scss']
})
export class ListmoduleComponent implements OnInit {

  rows = [];
  temp: string[];
  board: string;
  errorMessage: string;
  dato: any;
  info: any;
  datosDetalle: any;
  button = [];
  public moduleInfo = {
    'idModule': '',
    'nameModule': '',
    'description': '',
    'creatingDate': '',
  }


  // Table Column Titles
  columns = [
    { prop: 'nameModule' },
    { name: 'creatingDate' }
  ];

  constructor(private modalService: NgbModal,
    private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.configPage();
  }

  openCreateModule() {
    const modalRef = this.modalService.open(CreateonlyModuleComponent, {
      windowClass: '', size: 'lg',
    });
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry === 'Módulo Creado') {
        this.configPage();
      } else {
        return false;
      }
    })
  }

  configPage() {
    // Obtendremos los usuarios a partir del servicio SUPER o ADMIN
    if (this.tokenStorage.getAuthorities() === 'ROLE_SUPER') {
      this.authService.listarModulos().subscribe(
        data => {
          if (data.code === 200) {
            this.dato = JSON.parse(JSON.stringify(data.answerList));
            this.temp = [...this.dato];
            this.rows = this.dato;
          }
          if (data.code === 400) {
            swal({ type: 'error', text: data.answer });
          }
        },
        error => {
          this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
        }
      );
    } else {
      this.authService.listarModulosAdmin().subscribe(
        data => {
          if (data.code === 200) {
            this.dato = JSON.parse(JSON.stringify(data.answerList));
            this.temp = [...this.dato.data];
            this.rows = this.dato.data;
          }
          if (data.code === 400) {
            swal({ type: 'error', text: data.answer });
          }
        },
        error => {
          this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
        }
      );
    }
  }
  // Listar un módulo
  listModuleDetail(id) {
    this.authService.ListDetailModule(id).subscribe(
      data => {
        if (data.code === 200) {
          this.info = JSON.parse(JSON.stringify(data.genericObject));
          this.moduleInfo = {
            'nameModule': this.info.nameModule,
            'description': this.info.description,
            'idModule': this.info.idModule,
            'creatingDate': this.info.creatingDate,
          }
          const modalRef = this.modalService.open(DetailmoduleComponent, {
            windowClass: '', size: 'lg',
          });
          modalRef.componentInstance.moduleInfo = this.moduleInfo;
        }
        if (data.code === 400) {
          swal({ type: 'error', text: data.answer });
        }
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

  onUpdateModules(id) {
    let moduleInfoUpdate = {
      'idModules': id,
      'nameModule': '',
      'description': ''
    }
    this.authService.ListDetailModule(id).subscribe(
      data => {
        if (data.code === 200) {
          this.info = JSON.parse(JSON.stringify(data.genericObject));
          moduleInfoUpdate = {
            'idModules': id,
            'nameModule': this.info.nameModule,
            'description': this.info.description
          }
          const modalRef = this.modalService.open(UpdatemoduleComponent, {
            windowClass: '', size: 'lg',
          });
          // Enviamos la información al modal hijo.
          modalRef.componentInstance.moduleInfoUpdate = moduleInfoUpdate;
          // Recibimos la información del modal hijo.
          modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
            this.authService.updateModule(receivedEntry).subscribe(
              // tslint:disable-next-line:no-shadowed-variable
              data => {
                if (data.code === 200) {
                  JSON.parse(JSON.stringify(data));
                  this.configPage();
                  this.modalService.dismissAll();
                  swal({
                    title: 'Actualización Completa',
                    text: receivedEntry.nameModule + ' se ha actualizado correctamente',
                    type: 'success'
                  })
                }
                if (data.code === 400) {
                  swal({ type: 'error', text: data.answer });
                }
              },
              error => {
                this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
              }
            );
          })
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

  // Emparejamiento de Módulos
  toPairMenu(id) {
    let moduleInfoUpdate = {
      'idModules': id,
      'nameModule': '',
      'description': '',
    }
    this.authService.ListDetailModule(id).subscribe(
      data => {
        if(data.code===200){
          this.info = data.genericObject;
          moduleInfoUpdate = {
            'idModules': id,
            'nameModule': this.info.nameModule,
            'description': this.info.description,
          }
          const modalRef = this.modalService.open(ToPairMenuComponent, {
            windowClass: '', size: 'lg',
          });
          // Enviamos la información al modal hijo.
          modalRef.componentInstance.moduleInfoUpdate = moduleInfoUpdate;
        }
        if(data.code===400){
          swal({ type: 'error', text: data.answer })
        }
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

  onDelete(id) {
    this.authService.deleteModule(id).subscribe(
      data => {
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
  // Eliminar un módulo
  deleteWarning(info) {
    event.preventDefault(); // prevent form submit
    swal({
      title: '¿Está seguro que desea eliminar el módulo?',

      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.onDelete(info.idModule);
        swal({
          title: 'Eliminación Exitosa', type: 'success',
          text: 'El ' + info.nameModule + ' ha sido eliminado exitosamente'
        }
        )
      }
    })
  }
}

