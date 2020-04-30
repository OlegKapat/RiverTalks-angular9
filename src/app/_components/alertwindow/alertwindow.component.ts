import { Component, OnInit,NgZone, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {trigger,transition,style,state,animate} from '@angular/animations';
import {AlertwindowService} from '../../_services/alertwindow.service';
import { MessageService } from '../../_services/message.service';

@Component({
  selector: 'app-alertwindow',
  templateUrl: './alertwindow.component.html',
  styleUrls: ['./alertwindow.component.css'],
  animations: [
    trigger('dialog', [
        transition('void => *', [
          style({transform: 'scale3d(.3, .3, .3)'} ),
          animate(100)
          ]),
        transition('void => *', 
          animate(100, style({transform: 'scale3d(.3, .3, .3)'})))
      ])
    ]
})
export class AlertwindowComponent implements OnInit,AfterViewInit {
 
	
	modalStatus : boolean;
    userId:number;
	title:string;
	type: string;
	time: number;
	body: string;
	color: string;
	backColor: string;

  constructor(
  	private alertService : AlertwindowService,
	  private _ngZone : NgZone,
	  private messageService:MessageService,
	  private route:ActivatedRoute
  	) { }

  ngOnInit() {

  	this.alertService.alertSetings$.subscribe(
  		(data) => {
 			
 			this.title = data.title;
 			this.type = data.type;
 			this.time = data.time;
 			this.body = data.body

 			if(this.type == "danger"){
 				this.backColor = "#dc3545";
 			}

 			if(this.type == "infor" ){
 				this.backColor = "#117a8b";
 			}

 			if(this.type == "success"){
 				this.backColor = "#28a745";
 			}
 			this.modalStatus = true;
 			this._ngZone.runOutsideAngular(() =>

 				setTimeout(() =>
 					this._ngZone.run(() => 
 						this.modalStatus = false
 						), this.time
 					)
 				)
  		}
  		);

  }
  ngAfterViewInit(){
	  this.route.queryParams.subscribe(params=>this.userId=+params['messageId']);
  }
  resolve(){
  	this.modalStatus = false;
  }
  deleteMessage(){
	this.messageService.deleteMessage(this.userId);
	this.route.queryParams.subscribe(params=>{
		this.messageService.getMessage(+params['userId'],null)
	  })
	this.modalStatus = false;
  }
}
