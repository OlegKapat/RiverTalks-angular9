import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/_services';
import { ActivatedRoute, Params } from '@angular/router';
import { AvatarserviceService } from 'src/app/_services/avatarservice.service';
import { FileserviceService } from 'src/app/_services/fileservice.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-sendfileinchat',
  templateUrl: './sendfileinchat.component.html',
  styleUrls: ['./sendfileinchat.component.css']
})
export class SendfileinchatComponent implements OnInit,AfterViewInit,OnDestroy {
  files:any;
  fileUrl:string;
  fileId:number;
  groupId:number;
  userId:any;
  type:string;
  destroyed$ = new Subject();
  selectedIndex: number = null;

  constructor( private apiServie: ApiService,
    private fileService: FileserviceService,
    public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.fileService.getFile()
    this.apiServie.on("file/get").pipe(takeUntil(this.destroyed$)).subscribe(data=>{this.files=data['files'],console.log(data);
    
    })
    
  }
  selectFile(url,id,index,type) {
   this.fileUrl=url;
   this.fileId=id;
   this.type=type;
   this.selectedIndex = +index;
  }
  sendFile(){
    this.userId=+this.route.snapshot.queryParams.userId;
    this.groupId=+this.route.snapshot.queryParams.groupId;
    this.messageService.sendFile(this.userId,this.fileId,this.type)
    this.activeModal.close()
    
  }
 
  deleteFile(){
    this.fileService.delFile(this.fileId)
  }
  ngOnDestroy(){
    this.destroyed$.next();
    this.destroyed$.complete();
    
  }

}
