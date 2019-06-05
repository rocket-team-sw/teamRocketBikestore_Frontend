import { stringify } from '@angular/core/src/util';
import { Component, OnInit, Input } from '@angular/core';
import { ListmoduleComponent } from '../listmodule/listmodule.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-detailmodule',
  templateUrl: './detailmodule.component.html',
  styleUrls: ['./detailmodule.component.scss']
})
export class DetailmoduleComponent implements OnInit {

  @Input() public moduleInfo

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  closeWindow() {
    this.modalService.dismissAll();
  }



}
