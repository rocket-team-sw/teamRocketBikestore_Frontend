import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'app/shared/auth/auth.service';
import { Component, AfterViewChecked, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';
import { tokenKey } from '@angular/core/src/view';
import { ThrowStmt } from '@angular/compiler';
import { ChangePasswordComponent } from 'app/usercomponents/crud-user/change-password/change-password.component';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements AfterViewChecked, OnInit {
  currentLang = 'en';
  toggleClass = 'ft-maximize';
  placement = 'bottom-right'
  public isCollapsed = true;
  public activo = false;
  public correoUsuario: String;


  constructor(public translate: TranslateService,
    private router: Router,
    public token: TokenStorageService,
    private modalService: NgbModal) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.islogin();
    this.correoUsuario = this.token.getUsername();
  }

  ngAfterViewChecked() {

    // setTimeout(() => {
    //     var wrapperDiv = document.getElementsByClassName("wrapper")[0];
    //     var dir = wrapperDiv.getAttribute("dir");
    //     if (dir === 'rtl') {
    //         this.placement = 'bottom-left';
    //     }
    //     else if (dir === 'ltr') {
    //         this.placement = 'bottom-right';
    //     }
    // }, 3000);


  }
  // Método para desloguear al usuario.
  logOut() {
    this.token.signOut();
    this.router.navigate(['pages/login'])
  }

  changePassword() {
    const modalRef = this.modalService.open(ChangePasswordComponent, {
      windowClass: 'modal', size: 'lg'
    });
  }

  redirectToLogin() {
    this.router.navigate(['pages/login']);
  }


  ChangeLanguage(language: string) {
    this.translate.use(language);
  }

  ToggleClass() {
    if (this.toggleClass === 'ft-maximize') {
      this.toggleClass = 'ft-minimize';
    } else {
      this.toggleClass = 'ft-maximize'
    }
  }

  islogin() {
    if (this.token.getToken()) {
      this.activo = false;
    } else {
      this.activo = true;
    }
  }

  closeWindow() {
    this.modalService.dismissAll();
  }
}
