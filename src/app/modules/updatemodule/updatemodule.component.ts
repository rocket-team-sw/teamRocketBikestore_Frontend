import { AuthService } from './../../shared/auth/auth.service';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-updatemodule',
  templateUrl: './updatemodule.component.html',
  styleUrls: ['./updatemodule.component.scss']
})
export class UpdatemoduleComponent implements OnInit {
  form: any = {};
  module: FormGroup;
  @Input() public moduleInfoUpdate;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @ViewChild('f') updateModuleForm: NgForm;

  constructor(private authService: AuthService, private modalService: NgbModal, private moduleForm: FormBuilder) { }

  ngOnInit() {

    this.module = this.moduleForm.group({
      idModule: this.moduleInfoUpdate.idModules,
      nameModule: this.moduleInfoUpdate.nameModule,
      description: this.moduleInfoUpdate.description,
    });
  }
 // Con esta función le diremos al modal hijo que pase la información al modal padre.
  passBack() {
    const formValue = this.module.value;
    this.passEntry.emit(formValue);
    }

    closeWindow() {
      this.modalService.dismissAll();
    }


}
