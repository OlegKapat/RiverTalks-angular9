import { ApiService } from './../_services/api.service';
import {Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, } from '@angular/core';
import {AuthService, MessageService} from "../_services";
import {MatDialog} from "@angular/material/dialog";
import {ThemePalette} from '@angular/material/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {PageComponent} from "../page";
import { Message} from '../_models/message';
import { Events } from '../_models/websocket.events';
import { Observable } from 'rxjs';
import { EventEmitter } from 'events';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ForwardmodalComponent } from '../_services/shared/modals/forwardmodal/forwardmodal.component';
import { HttpLoaderFactory } from '../app.module';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
 
})
export class HomeComponent implements OnInit,AfterViewInit{
   opened=false;
   informed=false;
   disabled = false;
   checked=true;
   show=false;
   selected:boolean;
   searchfield="";
   messageId:number;
   messageForEdit:boolean;
   currentId:number;
   messageList:string[] = [];
   color: ThemePalette = 'primary';
   @ViewChild('text') inputmesssage:ElementRef;
   @ViewChild('edittext') edirmesssage:ElementRef;
   
 
  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    private apiservice:ApiService,
    private messageService:MessageService,
    private route:ActivatedRoute,
    private router:Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.route.queryParamMap.subscribe(param=>{this.selected=param['params'].select}) 
  }
  messageContent(message){
   this.messageForEdit=message;
  }
 showArray(){
  this.show=!this.show
 }
 sendMessage(message){
   if(!message){
     return
   }
   else{
   this.route.queryParams.subscribe(params=>{this.currentId=+params['userId']
   this.messageService.sendMessage(message,this.currentId);
   //this.apiservice.on<any>('message/send')
  })
   this.inputmesssage.nativeElement.value='';
   this.show=false;
   }
 }
 editMessage(message){
  this.route.queryParams.subscribe(params=>{this.messageId=+params['messageId']
    this.messageService.updateMessage(this.messageId,message);
})
     this.edirmesssage.nativeElement.value='';
     this.messageForEdit=false;
     this.router.navigate(['home'],{queryParams:{
      edit:undefined
  },  queryParamsHandling: 'merge',})
    }
    forward(){
      const modalRef = this.modalService.open(ForwardmodalComponent);
      modalRef.componentInstance.my_modal_title = 'Choose recipient...';
    }
    deleteMessage(){
      this.route.queryParams.subscribe(params=>{this.messageId=+params['messageId']
       this.messageService.deleteMessage(this.messageId);
    })
        this.route.queryParams.subscribe(params=>{
          this.messageService.getMessage(+params['userId'],null)
        })
    }
    cancel(){
        this.selected=false; 
        this.router.navigate(['home'],{queryParams:{
        select:undefined
    },  queryParamsHandling: 'merge',})
    }
 
}

