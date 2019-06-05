import { DetailmoduleComponent } from './../../modules/detailmodule/detailmodule.component';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'app/shared/auth/auth.service';
import { TokenStorageService } from 'app/shared/auth/token-storage.service';
import { CreatemenuComponent } from '../createmenu/createmenu.component';
import { UpdateMenuComponent } from '../update-menu/update-menu.component';

@Component({
  selector: 'app-listmenu',
  templateUrl: './listmenu.component.html',
  styleUrls: ['./listmenu.component.scss']
})
export class ListmenuComponent implements OnInit {

  rows = [];
  temp: string[];
  board: string;
  errorMessage: string;
  dato: any;
  info: any;
  datosDetalle: any;
  button = [];
  public menuInfo = {
    'idMenu': '',
    'menuName': '',
    'urlMenu': '',
    'creatingDate': '',
  }


  // Table Column Titles
  columns = [
    { prop: 'menuName' },
    { name: 'creatingDate' }
  ];

  constructor(private modalService: NgbModal,
    private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.configPage();
  }

  openCreateMenu() {
    const modalRef = this.modalService.open(CreatemenuComponent, {
      windowClass: '', size: 'lg',
    });
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry === 'Menú Creado') {
        this.configPage();
      } else {
        return false;
      }
    })
  }

  configPage() {
    // Obtendremos los usuarios a partir del servicio SUPER o ADMIN
    if (this.tokenStorage.getAuthorities() === 'ROLE_SUPER') {
      this.authService.listMenu().subscribe(
        data => {
          if(data.code===200){
            this.dato = JSON.parse(JSON.stringify(data.answerList));
            this.temp = [...this.dato];
            this.rows = this.dato;
          
          }
          if(data.code===400){
            swal({ type: 'error', text: data.answer });
          }
          },
         
        error => {
          this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
        }
      );
    } else {
      this.authService.listMenu().subscribe(
        data => {
          if(data.code===200){
            this.datosDetalle = JSON.parse(JSON.stringify(data.answerList));
            this.temp = [...this.dato];
            this.rows = this.dato;
          }
          if(data.code===400){
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
    this.authService.ListDetailMenu(id).subscribe(
      data => {
        this.info = JSON.parse(JSON.stringify(data.genericObject));
        this.menuInfo = {
          'menuName': this.info.menuName,
          'idMenu': this.info.idMenu,
          'creatingDate': this.info.creatingDate,
          'urlMenu': this.info.urlMenu
        }
        const modalRef = this.modalService.open(DetailmoduleComponent, {
          windowClass: '', size: 'lg',
        });
        modalRef.componentInstance.moduleInfo = this.menuInfo;
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
      'description': '',
      'codeModule': ''
    }
    this.authService.ListDetailModule(id).subscribe(
      data => {
        this.info = JSON.parse(JSON.stringify(data));
        console.log('Módulo a actualizar: ', id);
        moduleInfoUpdate = {
          'idModules': id,
          'nameModule': this.info.nameModule,
          'description': this.info.description,
          'codeModule': this.info.codeModule,
        }
        const modalRef = this.modalService.open(UpdateMenuComponent, {
          windowClass: '', size: 'lg',
        });
        // Enviamos la información al modal hijo.
        modalRef.componentInstance.moduleInfoUpdate = moduleInfoUpdate;
        // Recibimos la información del modal hijo.
        modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
          this.authService.updateModule(receivedEntry).subscribe(
            data => {
              JSON.parse(JSON.stringify(data));
              this.configPage();
              this.modalService.dismissAll();
            },
            error => {
              this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
            }
          );
        })
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

  onDelete(id) {
    this.authService.deleteMenu(id).subscribe(
      data => {
        if(data.code===200){
          this.configPage();
        }
        if(data.code===400){
          swal({ type: 'error', text: data.answer });
        }
        
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }
  // Eliminar un módulo
  deleteWarning(id) {
    event.preventDefault(); // prevent form submit
    swal({
      title: '¿Está seguro que desea eliminar el menu?',

      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.onDelete(id);
        swal({
          title: 'Eliminación Exitosa', type: 'success',
          text: 'El Menú ' + id + ' ha sido eliminado exitosamente'
        }
        )
      }
    })
  }

}
