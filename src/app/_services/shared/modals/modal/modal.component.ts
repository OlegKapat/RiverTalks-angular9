import { Component, OnInit, AfterViewInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from '../../../message.service';
import { ApiService } from '../../../api.service';
import { ForwardmodalComponent } from '../forwardmodal/forwardmodal.component';
import { RefDirective } from '../../directives/ref.directive';
import {AlertwindowService} from '../../../alertwindow.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit,AfterViewInit {
 
  visible=false;
 
  @ViewChild(RefDirective)refDir:RefDirective;
  constructor(private route:ActivatedRoute, private messageService:MessageService, private apiService:ApiService, 
    private resolver:ComponentFactoryResolver, private alertService:AlertwindowService, public dialog:MatDialog,
    private router:Router,private modalService: NgbModal) { }

  ngOnInit(): void {

  }
  ngAfterViewInit(){
   
}
  edit(){
      this.router.navigate(['/home'],{queryParams:{
        edit:true
      }, queryParamsHandling: 'merge',}
      )
      this.dialog.closeAll()  
  }
  copy(){
    let item=sessionStorage.getItem("copy")
    let listener = (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
  };
   document.addEventListener('copy', listener);
   document.execCommand('copy');
   document.removeEventListener('copy', listener);
    
    this.dialog.closeAll()  
  }
  forward(){
    const modalRef = this.modalService.open(ForwardmodalComponent);
    modalRef.componentInstance.my_modal_title = 'Choose recipient...';
    //modalRef.componentInstance.my_modal_content = 'I am your content';
    this.dialog.closeAll();
     
  }
  deleteMessage(){
    this.alertService.create("You are trying to delete message","Danger",10000,"Danger Alert"); 
    this.dialog.closeAll();
    
  }
  select(){
    this.router.navigate(['home'],{queryParams:{
      select:true
    }, queryParamsHandling: 'merge',}
    )
    this.dialog.closeAll()  
  }
  showmodal(){
     // кастомная модалка. Не используется. Потом удалим. 
    // const modalWindow=this.resolver.resolveComponentFactory(DelmodalComponent)
    //  const component=this.refDir.containerRef.createComponent(modalWindow)
    //  component.instance.cancel.subscribe(()=>{
    //  this.refDir.containerRef.clear()
    //  })
  }
 
 
}
