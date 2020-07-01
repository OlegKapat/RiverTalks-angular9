import { Component, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CreatenewgroupComponent} from '../../_services/shared/modals/createnewgroup/createnewgroup.component';
import { CreatechannelComponent } from 'src/app/_services/shared/modals/createchannel/createchannel.component';
import { ContactmodalComponent } from 'src/app/_services/shared/modals/contactmodal/contactmodal.component';
import {SettingsComponent} from '../../_services/shared/modals/settings/settings.component';
import { ApiService } from 'src/app/_services';
import { UserService } from 'src/app/_services/user.service';
import { EditprofileComponent } from 'src/app/_services/shared/modals/editprofile/editprofile.component';


@Component({
  selector: 'app-left-side-card',
  templateUrl: './left-side-card.component.html',
  styleUrls: ['./left-side-card.component.scss'],
 
})
export class LeftSideCardComponent implements OnInit {
  user:any;
  constructor(private modalService: NgbModal, private apiService:ApiService, private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUser();
    this.apiService.on('user/get').subscribe(data=>{this.user=data},error=>console.log(error));
    
  }
 
  createNewGroup(){
        this.modalService.open(CreatenewgroupComponent)
  }
  createNewChannel(){
    this.modalService.open(CreatechannelComponent)
}
  showContacts(){
  this.modalService.open(ContactmodalComponent,{ size: 'lg'} )
}
showSettings(){
  this.modalService.open(SettingsComponent,{ size: 'sm'})
}
openProfile(){
  this.modalService.open(EditprofileComponent,{size:"sm"})
}
}
