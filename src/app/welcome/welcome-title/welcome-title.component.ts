import { AuthService } from 'app/shared/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-title',
  templateUrl: './welcome-title.component.html',
  styleUrls: ['./welcome-title.component.scss']
})
export class WelcomeTitleComponent implements OnInit {
  src: any;
  errorMessage: any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  mostrarImagen() {
  }

}
