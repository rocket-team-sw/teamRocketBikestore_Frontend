import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: 'app-to-pair-menu',
  templateUrl: './to-pair-menu.component.html',
  styleUrls: ['./to-pair-menu.component.scss']
})
export class ToPairMenuComponent implements OnInit {

  rows = [];
  temp: string[];
  public menuInfo: any;
  selectedModule: any = '';
  moduleMenu: any = {
    'idMenu': '-1',
    'idModule': ''
  }
  public moduleInfo = {
    'nameModule': '',
    'codeModule': '',
    'description': ''
  }
  title = 'Seleccione'
  errorMessage = '';
  isPairedMenuFailed = false;
  dato: any;
  form: any = {};

  columns = [
    { prop: 'menuName' },
    { name: 'creatingDate' }
  ];
  @Input() public moduleInfoUpdate;
  @ViewChild('f') ModuleForm: NgForm;

  constructor(private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit() {
    this.form.moduleMenu = {
      'idMenu': '-1',
      'idModule': ''
    };
    this.configSelectMenu()
    this.listMenuModule(this.moduleInfoUpdate.idModules);
  }

  configSelectMenu() {
    this.authService.listMenu().subscribe(
      data => {
        if(data.code===200){
          this.menuInfo = data.answerList;
        }
        if(data.code===400){
          swal({ type: 'error', text: data.answer });
        }
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }

  listMenuModule(id) {
    this.authService.listMenuModule(id).subscribe(
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
        this.errorMessage = error.error.message;
      }
    );
  }

  toPair(idMenu, idModule) {
    const url = 'api/module/pairModuleMenu';
    this.moduleMenu = {
      'idMenu': idMenu,
      'idModule': idModule
    }
    this.authService.toPairMenu(url, this.moduleMenu).subscribe(
      data => {
        if(data.code===200){
          JSON.parse(JSON.stringify(data));
          this.isPairedMenuFailed = false;
          this.listMenuModule(idModule);  
        }
        if(data.code===400){
          swal({ type: 'error', text: data.answer });
        }
        },
      error => {
        console.log(error);
        this.isPairedMenuFailed = true;
        this.errorMessage = error.error.info;
      }
    );
  }

  unPair(idMenu, idModule) {
    const url = 'api/module/disPairModuleMenu';
    this.moduleMenu = {
      'idMenu': idMenu,
      'idModule': idModule
    }
    this.authService.unpairModuleMenu(url, this.moduleMenu).subscribe(
      data => {
        if(data.code===200){
          JSON.parse(JSON.stringify(data));
          this.listMenuModule(idModule);
        }
        if(data.code===400){
          swal({ type: 'error', text: data.answer });
        }
      },
      error => {
        this.errorMessage = error.error.info;
      }
    );
  }

  closeWindow() {
    this.modalService.dismissAll();
  }

}
