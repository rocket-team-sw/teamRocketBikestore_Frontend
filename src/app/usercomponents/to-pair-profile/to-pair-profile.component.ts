import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'app/shared/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'app/shared/auth/token-storage.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-to-pair-profile',
  templateUrl: './to-pair-profile.component.html',
  styleUrls: ['./to-pair-profile.component.scss']
})
export class ToPairProfileComponent implements OnInit {

  public profileInfo: any;
  public userProfile = {
    'idRole': '',
    'idUser': ''
  }
  errorMessage = '';
  isPairedProfileFailed = false;
  dato: any;
  form: any = {};
  nombrePerfil: any;
  descripcionPerfil: any;

  @Input() public userInfoUpdate;
  @ViewChild('f') profileForm: NgForm;

  constructor(private authService: AuthService,
    private modalService: NgbModal, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.configSelectProfile();
    this.listProfileUser(this.userInfoUpdate.id);

  }

  configSelectProfile() {
    if (this.tokenStorage.getAuthorities() === 'ROLE_SUPER') {
      this.authService.listarPerfiles().subscribe(
        data => {
          console.log(data)
          if (data.code === 200) {
            this.profileInfo = JSON.parse(JSON.stringify(data.answerList));
          }
          if (data.code === 400) {
            swal({ type: 'error', text: data.answer })
          }
        },
        error => {
          this.errorMessage = error.error.message;
        }
      );
    } else {

      this.authService.listarPerfilesAdmin().subscribe(
        
        data => {
          console.log(data)
          if (data.code === 200) {
            this.profileInfo = JSON.parse(JSON.stringify(data.answerList));
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

  }

  listProfileUser(id) {
    this.authService.listProfileUser(id).subscribe(
      data => {
        console.log('holammmm',data)
        if (data.code === 200) {
          this.dato = data.genericObject;
          this.nombrePerfil = this.dato.profileName;
          this.descripcionPerfil = this.dato.description;
          this.listProfileUser(id);
        }
        if (data.code === 400) {
          swal({ type: 'error', text: data.answer })
        }
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    );
  }

  toPairProfile(idRole, idUser) {
    const url = 'api/user/pair';
    this.userProfile = {
      'idRole': idRole,
      'idUser': idUser
    }
    this.authService.toPairUserProfile(url, this.userProfile).subscribe(
      data => {
        if (data.code === 200) {
          JSON.parse(JSON.stringify(data));
          this.isPairedProfileFailed = false;
          this.listProfileUser(idUser);
        }
        if (data.code === 400) {
          swal({ type: 'error', text: data.answer })
          this.isPairedProfileFailed = true;
        
        }
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.info;
       
      }
    );
  }

  unPair(idRole, idUser) {
    const url = 'api/user/unpairUserProfile';
    this.userProfile = {
      'idRole': idRole,
      'idUser': idUser
    }
    this.authService.unpairModulePlan(url, this.userProfile).subscribe(
      data => {
        if (data.code === 200) {
          JSON.parse(JSON.stringify(data));
          this.listProfileUser(idRole);
        }
        if (data.code === 400) {
          swal({ type: 'error', text: data.answer })
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


