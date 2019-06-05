import { FirebaseStorageService } from './../firebase/firebase-storage.service';
import { AuthService } from 'app/shared/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../auth/token-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';


declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  public menuItems: any[] = [];
  public variable: any;
  public correoUsuario: String;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  public error;
  public load = false;


  constructor(private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private authService: AuthService,
    private firebaseServices: FirebaseStorageService,
    private token: TokenStorageService,
    private spinner: NgxSpinnerService,
  ) {

  }

  uploadLogo(event) {

    const file = event.target.files[0];
    this.firebaseServices.uploadFile(this.token.getCompanyId() + '/' + 'logos', 'logo', file).then((result) => {
      if (result) {
        this.firebaseServices.loadFile(this.token.getCompanyId() + '/' + 'logos', 'logo').then((url) => {
          document.querySelector('img').src = url + new Date().getTime()
        }).catch((err) => {
          console.log(err)
          document.querySelector('img').src = '../../../assets/img/nologo.jpg';
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  isLogin() {
    if (this.token.getToken() === null) {
      return false
    } else {
      return true
    }
  }

  ngOnInit() {
    $.getScript('./assets/js/app-sidebar.js');
    this.filterMenu();
    if (this.isLogin()) {
      this.firebaseServices.loadFile(this.token.getCompanyId() + '/' + 'logos', 'logo').then((url) => {
        console.log(url)
        document.querySelector('img').src = url + new Date().getTime()
      }).catch((err) => {
        console.log(err)
        document.querySelector('img').src = '../../../assets/img/nologo.jpg';
      })
    }
  }

  filterMenu() {
    this.authService.dynamicLoadModuleMenu().subscribe(
      data => {
        if(data.code===200){
          this.variable = data.answerList;
          // tslint:disable-next-line:forin
          for (const i in this.variable) {
            const subMenuArray = []
            for (const subMenu of this.variable[i].listMenu) {
              subMenuArray.push(
                { path: subMenu.path, title: subMenu.title, icon: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
              )
            }
            const modulo: RouteInfo = {
              path: '', title: this.variable[i].module.nameModule, icon: '', class: 'has-sub', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: subMenuArray
            }
            ROUTES.push(modulo);
          }
        }
        if(data.code===400){
          swal({ type: 'error', text: data.answer });
        }
      },
      error => {
        console.log(error);
      }
    );
    this.menuItems = ROUTES
  }


  // NGX Wizard - skip url change
  ngxWizardFunction(path: string) {
    if (path.indexOf('forms/ngx') !== -1) {
      this.router.navigate(['forms/ngx/wizard'], { skipLocationChange: false });
    }
  }
}
