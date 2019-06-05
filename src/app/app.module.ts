import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
import { DragulaModule } from 'ng2-dragula';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { RoleAuthGuard } from './shared/auth/roleAuth-guard.service';
import { CrudUserModule } from './usercomponents/crud-user/crud-user.module';
import { ModulesModule } from './modules/modules.module';
import { WelcomeModule } from './welcome/welcome.module';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environmentFire } from 'environments/environment.prod';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxLoadingModule } from 'ngx-loading';
import { BicicletaModule } from './bicicleta/bicicleta.module';



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    ContentLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgxLoadingModule.forRoot({}),
    StoreModule.forRoot({}),
    // Módulo importante para la navegación dentro de la app
    AppRoutingModule,
    SharedModule,
    DragulaModule.forRoot(),
    // Módulo importante para el consumo de servicios dentro de la app
    HttpClientModule,
    HttpModule,
    ToastrModule.forRoot(),
    NgbModule.forRoot(),

     /** Angular Firebase Modules */
     AngularFireModule.initializeApp(environmentFire.firebase),
     AngularFireStorageModule,


    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBr5_picK8YJK7fFR2CPzTVMj6GG1TtRGo'
    }),
    CrudUserModule,
    ModulesModule,
    WelcomeModule,
    FormsModule, 
    ReactiveFormsModule,
    ChartsModule,
    BicicletaModule,
  ],
  providers: [
    RoleAuthGuard,
    AuthService,
    AuthGuard,
    DatePipe
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
