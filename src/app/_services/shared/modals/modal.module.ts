import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { ForwardmodalComponent } from './forwardmodal/forwardmodal.component';
import { SearchPipe } from '../pipes/search.pipe';
import { ContactmodalComponent } from './contactmodal/contactmodal.component';
import { CreatenewgroupComponent } from './createnewgroup/createnewgroup.component';
import { CreatechannelComponent } from './createchannel/createchannel.component';
import { SettingsComponent } from './settings/settings.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ModalforuserComponent } from './modalforuser/modalforuser.component';
import { ModalforgroupComponent } from './modalforgroup/modalforgroup.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ContactforshareComponent } from './contactforshare/contactforshare.component';
import { EditcontactComponent } from './editcontact/editcontact.component';
import { DeletecontactComponent } from './deletecontact/deletecontact.component';
import { ClearchatComponent } from './clearchat/clearchat.component';
import { DeletechatComponent } from './deletechat/deletechat.component';
import { BlockuserComponent } from './blockuser/blockuser.component';
import { GroupprofileComponent } from './groupprofile/groupprofile.component';
import { GroupmembersComponent } from './groupmembers/groupmembers.component';
import { ModalforuserprofileComponent } from './modalforuserprofile/modalforuserprofile.component';
import { LeavegroupComponent } from './leavegroup/leavegroup.component';
import { CleargroupchatComponent } from './cleargroupchat/cleargroupchat.component';
import { DeletemessageComponent } from './deletemessage/deletemessage.component';
import { UseringroupPipe } from '../pipes/useringroup.pipe';

import { GroupavatarComponent } from './groupavatar/groupavatar.component';
import { DeletegroupComponent } from './deletegroup/deletegroup.component';
import { AddmembertogroupComponent } from './addmembertogroup/addmembertogroup.component';
import { GroupmembderwithaddComponent } from './groupmembderwithadd/groupmembderwithadd.component';
import { ManagegroupComponent } from './managegroup/managegroup.component';
import { EditusernameComponent } from './editusername/editusername.component';
import { EditemailComponent } from './editemail/editemail.component';
import { EditphoneComponent } from './editphone/editphone.component';
import { GetimageforavatarComponent } from './getimageforavatar/getimageforavatar.component';

@NgModule({
  declarations: [
                 SearchPipe,
                 ContactmodalComponent,
                 CreatenewgroupComponent,
                 CreatechannelComponent,
                 AddcontactComponent,
                 ForwardmodalComponent,
                 SettingsComponent,
                 EditprofileComponent,
                 ModalforuserComponent,
                 ModalforgroupComponent,
                 UserprofileComponent,
                 ContactforshareComponent,
                 EditcontactComponent,
                 DeletecontactComponent,
                 ClearchatComponent,
                 DeletechatComponent,
                 BlockuserComponent,
                 GroupprofileComponent,
                 GroupmembersComponent,
                 ModalforuserprofileComponent,
                 LeavegroupComponent,
                 CleargroupchatComponent,
                 DeletemessageComponent,
                 UseringroupPipe,
                
                 GroupavatarComponent,
                 DeletegroupComponent,
                 AddmembertogroupComponent,
                 GroupmembderwithaddComponent,
                 LeavegroupComponent,
                 ManagegroupComponent,
                 EditusernameComponent,
                 EditemailComponent,
                 EditphoneComponent,
                 GetimageforavatarComponent

  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  exports:[SearchPipe,UseringroupPipe,UseringroupPipe]
})
export class ModalModule { }
