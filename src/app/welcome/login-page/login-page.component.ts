import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginCredentials } from './../../shared/auth/loginCredentials';
import { TokenStorageService } from './../../shared/auth/token-storage.service';
import { AuthService } from './../../shared/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: any = {};
  // Variable de bandera para garantizar token recibido.
  isLoggedIn = false;
  public isLoginFailed = false;
  errorMessage = '';
  roles: string;
  username: string;
  // roles: string[] = [];
  // Variable de instancia LoginCredentials con la información de las credenciales de inicio de sesión.
  private loginInfo: LoginCredentials;

  @ViewChild('f') loginForm: NgForm;

  ngOnInit() {
    // Hacemos una validación que me permita conocer que si el token coincide con las credenciales, continuar.
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      // this.roles = this.tokenStorage.getAuthorities();
    }
  }
  // Importamos en el constructor las variables de authService y TokenStorage
  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private tokenStorage: TokenStorageService) { }

  // On submit button click
  onSubmit() {
    // this.loginForm.reset();
    const url = 'api/auth';
    console.log('entra', this.form);
    // const token = sessionStorage.getItem('token');
    // Llenamos el objeto con las credenciales recogidas del formulario.
    this.loginInfo = new LoginCredentials(
      this.form.email,
      this.form.password);

    // Acá como el método attemAuth tiene un observable, la data que subscribe será de tipo JWTResponse.
    // Tambièn le pasaremos las credenciales que tenga el formulario del login para que los tome como loginInfo
    // Y luego procederemos a guardar con nuestro servicio de TokenStorage los pertinentes datos.
    this.authService.attemptAuth(url, this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        // Username = email.
        this.tokenStorage.saveUsername(data.user.email);
        this.tokenStorage.saveID(data.user.userId);
        this.tokenStorage.saveIdCompany(data.user.companyId);
        this.tokenStorage.saveAuthorities(data.user.role);
        // Permisos con los que contaría el usuario que se está logueando.
        // this.tokenStorage.saveAuthorities(data.authorities);
        // También setearemos estas variables para autenticar al usuario.
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // Permisos del usuario de acuerdo al rol.
        this.username = this.tokenStorage.getUsername();
        this.roles = this.tokenStorage.getAuthorities();
        this.reloadPage();
        // this.router.navigate(['dashboard/dashboard1'], { queryParams: {} });
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
        console.log('Este usuario no existe en la base de datos');
      }
    );
  }
  // On Forgot password link click
  onForgotPassword() {
    this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    console.log('entra forgot');
  }
  // On registration link click
  onRegister() {
    this.router.navigate(['register'], { relativeTo: this.route.parent });
  }
  // On cancel button
  onCancel() {
    console.log('entra al cancel');
    // Revisar hacia dónde redirigir si cancela.
    this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
  }

  reloadPage() {
    window.location.reload();
  }
}
