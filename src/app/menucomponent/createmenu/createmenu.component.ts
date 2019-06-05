import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'app/shared/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: 'app-createmenu',
  templateUrl: './createmenu.component.html',
  styleUrls: ['./createmenu.component.scss']
})
export class CreatemenuComponent implements OnInit {

  public menuInfo = {
    'menuName': '',
    'path': '',
    'title': '',
    'icon': '',
    'clase': '',
    'badge': '',
    'badgeClass': ''
  }
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  public isCreatedMenu = false;
  errorMessage: any;
  form: any = {};
  @ViewChild('f') createMenuForm: NgForm;


  constructor(private authService: AuthService,
    private modalService: NgbModal) { }

  ngOnInit() {
  }

  onSubmit() {

    this.menuInfo = {
      'menuName': this.form.menuName,
      'path': this.form.menuPath,
      'title': this.form.menuTitle,
      'icon': this.form.menuTitle,
      'clase': this.form.menuClass,
      'badge': this.form.menuBadge,
      'badgeClass': this.form.menuBadgeClass
    }
    console.log(this.menuInfo)
    this.authService.createMenu(this.menuInfo).subscribe(
      data => {
        if(data.code===200){
          this.isCreatedMenu = true;
          JSON.parse(JSON.stringify(data));
          console.log('menú creado:', data);
          this.modalService.dismissAll();
          this.passEntry.emit('Menú Creado');  
        }
        if(data.code===400){
          this.isCreatedMenu = false;
          swal({ type: 'error', text: data.answer });
        }
        },
      error => {
        console.log(error);
        this.isCreatedMenu = false;
        this.errorMessage = error.error.info;
      }
    );
  }

  closeButton() {
    this.modalService.dismissAll();
  }


}
