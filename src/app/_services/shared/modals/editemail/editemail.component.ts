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
   
  }
  ngAfterViewInit(){
  
  }
  ngAfterContentInit(){
    this.apiService.on('user/get').subscribe(data=>{this.currentEmail=data['user']['email'],console.log(data);
  })
  }
  editMail(mail) {
    this.userService.mailUpdate(mail);
    this.activeModal.close();
  }
}
