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

@NgModule({
  declarations: [
                 SearchPipe,
                 ContactmodalComponent,
                 CreatenewgroupComponent,
                 CreatechannelComponent,
                 AddcontactComponent,
                 ForwardmodalComponent,  
                 
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  exports:[SearchPipe]
})
export class ModalModule { }
