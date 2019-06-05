import { ChangePasswordByComponent } from './../change-password-by/change-password-by.component';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'app/shared/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  form: any = {};
  public planInfo: any;
  user: FormGroup;
  errorMessage = '';
  public selected: any;
  @Input() public userInfoUpdate;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @ViewChild('f') updateUserForm: NgForm;

  constructor(private authService: AuthService,
    private modalService: NgbModal,
    private userForm: FormBuilder) { }

  ngOnInit() {
    this.configSelectPlan();
    this.user = this.userForm.group({
      userId: this.userInfoUpdate.userId,
      name: this.userInfoUpdate.name,
      email: this.userInfoUpdate.email,
      userName: this.userInfoUpdate.userName,
      address: this.userInfoUpdate.address,
      role: this.userInfoUpdate.role,
      phone: this.userInfoUpdate.phone,
      documentType: this.userInfoUpdate.documentType,
      documentNumber: this.userInfoUpdate.documentNumber,
      nameCompany: this.userInfoUpdate.nameCompany,
      activatedPlan: this.userInfoUpdate.activatedPlan
      // enable: this.userInfoUpdate.enable,
    });
  }
  // Con esta función le diremos al modal hijo que pase la información al modal padre.
  passBack() {
    const formValue = this.user.value;
    this.passEntry.emit(formValue);
  }

  configSelectPlan() {
    this.authService.listarPlanes().subscribe(
      data => {
        if(data.code===200){
          this.planInfo = data.answerList;
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

  changePassword() {
    const userInfo = {
      'idUser': this.userInfoUpdate.userId,
      'name': this.userInfoUpdate.name
    };
    const modalRef = this.modalService.open(ChangePasswordByComponent, {
      windowClass: 'modal', size: 'lg'
    });
    modalRef.componentInstance.userInfo = userInfo;
  }

  closeWindow() {
    this.modalService.dismissAll();
  }


}
