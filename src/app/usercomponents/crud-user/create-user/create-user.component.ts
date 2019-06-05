import { text } from '@angular/core/src/render3';
import { AuthService } from './../../../shared/auth/auth.service';
// import { CreateCompanyComponent } from './../../../companycomponents/crud-company/create-company/create-company.component';
import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { SignUpInfo } from 'app/shared/auth/signUp-info';
import swal from 'sweetalert2';
import { TokenStorageService } from 'app/shared/auth/token-storage.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  roleTitle = this.tokenStorage.getAuthorities();
  passwordValidationError = '';
  isErrorPassword = false;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  @Input() public modalInformacion;

  @ViewChild('f') registerForm: NgForm;

  constructor(private router: Router, private modalService: NgbModal,
    private authService: AuthService,
    private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    // console.log('El dato' + this.modalInformacion.idCriterio);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  /*
    upload() {
      this.progress.percentage = 0;

      this.currentFileUpload = this.selectedFiles.item(0);
      this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
        }
      });

      this.selectedFiles = undefined;
    }
    */

  passwordValidation() {
    if (this.form.password !== this.form.confirmPassword && this.form.confirmPassword != null) {
      this.passwordValidationError = '¡Las Contraseñas No Coinciden!';
      this.isErrorPassword = true;
      setTimeout(() => { this.isErrorPassword = false; }, 3000);
    } else {
    }
  }

  onSubmit() {
    let roleFunction = '';
    if (this.tokenStorage.getAuthorities() === 'ROLE_SUPER') {
      roleFunction = 'ROLE_ADMIN';
    } else {
      roleFunction = this.form.role;
    }
    // Declaramos una variable que contenga la cadena que completa la URL de registrar.
    const url = 'api/user/create';
    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      roleFunction,
      this.form.companyName,
      this.form.companyAddress,
      this.form.companyPhone,
      this.form.password,
      this.form.phone,
      this.form.address,
      this.form.document,
      this.form.documentType
    );
    const dataSend = {
      'companyName': this.form.companyName
    }
    this.authService.signupUser(url, JSON.parse(JSON.stringify(this.signupInfo)), dataSend).subscribe(
      data => {
        if (data.code === 201) {
          this.isSignedUp = true;
          this.isSignUpFailed = false;
          swal({
            type: 'success',
            text: '¡Usuario creado satisfactoriamente!'
          });
          this.modalService.dismissAll();
          // Le pasamos una palabra clave de registro hecho al padre
          this.passEntry.emit('Usuario Registrado');
        }
        if (data.code === 400) {
          this.errorMessage = data.answer;
          this.isSignedUp = false;
          this.isSignUpFailed = true;
        }
      },
      error => {
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}


