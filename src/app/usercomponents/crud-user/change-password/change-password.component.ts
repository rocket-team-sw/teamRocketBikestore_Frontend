import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'app/shared/auth/token-storage.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  errorMessage: any;
  form: any = {};
  passwordValidationError = '';
  isErrorPassword = false;

  @ViewChild('f') planForm: NgForm;
  constructor(private authService: AuthService,
    private modalService: NgbModal,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
  }

  changePassword() {
    const url = 'api/user/update/password';
    const passwordInfoUpdate = {
      'idUser': this.tokenStorageService.getId(),
      'oldPassword': this.form.oldPassword,
      'newPassword': this.form.newPassword
    }
    this.authService.changePassword(url, passwordInfoUpdate).subscribe(
      data => {
        if (data.code === 200) {
          data;
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
    if (this.form.newPassword !== this.form.newPasswordConfirm && this.form.newPasswordConfirm != null) {
      this.isErrorPassword = false;
      this.passwordValidationError = '¡Las Contraseñas Nuevas No Coinciden!';
    } else {  
      
      this.isErrorPassword = true;
      
    }
  }
  closeWindow() {
    this.modalService.dismissAll();
  }
}
