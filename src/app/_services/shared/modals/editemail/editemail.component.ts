import { Component, OnInit, AfterViewInit, DoCheck, AfterContentInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "src/app/_services/user.service";
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: "app-editemail",
  templateUrl: "./editemail.component.html",
  styleUrls: ["./editemail.component.css"],
})
export class EditemailComponent implements OnInit,AfterViewInit,AfterContentInit {
  currentEmail:string;
  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private apiService:ApiService
  ) {}

  ngOnInit(): void {
   this.currentEmail= sessionStorage.getItem("namemail")
  }
  ngAfterViewInit(){

  }
  ngAfterContentInit(): void {

  }
  editMail(mail) {
    this.userService.mailUpdate(mail);
    this.activeModal.close();
  }
}
