import { AuthService } from './../../shared/auth/auth.service';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListmoduleComponent } from '../listmodule/listmodule.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-createonly-module',
  templateUrl: './createonly-module.component.html',
  styleUrls: ['./createonly-module.component.scss']
})
export class CreateonlyModuleComponent implements OnInit {

  public moduleInfo = {
    'nameModule': '',
    'description': ''
  }
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  public isCreatedModule = true;
  errorMessage: any;

  form: any = {};
  @ViewChild('f') createModuleForm: NgForm;


  constructor(private authService: AuthService,
    private modalService: NgbModal) { }

  ngOnInit() {
  }

  onSubmit() {

    this.moduleInfo = {
      'nameModule': this.form.nameModule,
      'description': this.form.description
    }
    this.authService.createModule(this.moduleInfo).subscribe(
      data => {
        if (data.code === 200) {
          this.isCreatedModule = true;
          JSON.parse(JSON.stringify(data));
          this.modalService.dismissAll();
          this.passEntry.emit('Módulo Creado');
        }
        if (data.code === 400) {
          this.isCreatedModule = false;
          swal({type: 'error', text: data.answer});
        }
      },
      error => {
        console.log(error);
        this.isCreatedModule = false;
        this.errorMessage = error.error.info;
      }
    );
  }

  closeWindow() {
    this.modalService.dismissAll();
  }


}
