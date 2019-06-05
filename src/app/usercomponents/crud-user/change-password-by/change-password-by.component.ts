import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'app/shared/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'app/shared/auth/token-storage.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-change-password-by',
  templateUrl: './change-password-by.component.html',
  styleUrls: ['./change-password-by.component.scss']
})
export class ChangePasswordByComponent implements OnInit {

  errorMessage: any;
  form: any = {};
  passwordValidationError = '';
  isErrorPassword = false;
  @Input() public userInfo;
  public name: any;
  private id: any;
  @ViewChild('f') planForm: NgForm;
  constructor(private authService: AuthService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.name = this.userInfo.name;
    this.id = this.userInfo.idUser;
  }

  changePassword() {
    const url = 'api/user/update/password';
    const passwordInfoUpdate = {
      'idUser': this.id,
      'oldPassword': this.form.oldPassword,
      'newPassword': this.form.newPassword
    }
    this.authService.changePassword(url, passwordInfoUpdate).subscribe(
      data => {
        if (data.code === 200) {
          JSON.parse(JSON.stringify(data));
          console.log('meneses', data)
          swal({
            type: 'success',
            text: 'Contraseña Actualizada Correctamente'
          })
          this.modalService.dismissAll();
        }
        if (data.code === 400) {
          swal({ type: 'error', text: data.answer });
        }

      },
      error => {
        console.log(error)
        this.errorMessage = JSON.stringify(error.error.mensaje);
      }
    );
  }

  passwordValidation() {
    debugger;
    if (this.form.newPassword !== this.form.newPasswordConfirm && this.form.newPasswordConfirm != null) {
      this.isErrorPassword = false;
    } else {  
      this.passwordValidationError = '¡Las Contraseñas Nuevas No Coinciden!';
      this.isErrorPassword = true;
      setTimeout(() => { this.isErrorPassword = false; }, 3000);
    }
  }

  closeWindow() {
    this.modalService.dismissAll();
  }

}
