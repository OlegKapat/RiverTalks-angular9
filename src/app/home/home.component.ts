import { ApiService } from './../_services/api.service';
import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {AuthService} from "../_services";
import {MatDialog} from "@angular/material/dialog";
import {ThemePalette} from '@angular/material/core';
import {PageComponent} from "../page";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   opened=false;
   informed=false;
   disabled = false;
   checked=true;
   show=false;
   newMessage:string;
   messageList:string[] = [];
   color: ThemePalette = 'primary';
   @ViewChild('text') inputmesssage:ElementRef;
  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    private apiservice:ApiService,
  ) {
  }

  ngOnInit(): void {
     this.apiservice.on<any>("user/get").subscribe((res)=>console.log(res)
     )
  }
 showArray(){
  this.show=!this.show
}
 sendMessage(){
    this.apiservice.on('user/message').subscribe((res)=>console.log(res)
    )
    this.inputmesssage.nativeElement.value='';
    this.show=false;
 }
}

