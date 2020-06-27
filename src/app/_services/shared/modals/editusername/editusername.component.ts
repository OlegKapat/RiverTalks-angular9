import { Component, OnInit, AfterViewInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "src/app/_services/user.service";
import { ApiService } from 'src/app/_services/api.service';

@Component({
  
  selector: "app-editusername",
  templateUrl: "./editusername.component.html",
  styleUrls: ["./editusername.component.css"],
})
export class EditusernameComponent implements OnInit{
  fullname:string;
  
  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private apiService:ApiService,
  ) {}

  ngOnInit( ): void {this.fullname= sessionStorage.getItem("namelogin")}

  editName(name) {
    this.userService.userUpdate(name);
    this.apiService.on('user/get').subscribe(data=>console.log(data)
    )
    this.activeModal.close();
  }
}
