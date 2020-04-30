import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertwindowComponent} from '../../../../../_components/alertwindow/alertwindow.component';
import {AlertwindowService} from '../../../../alertwindow.service';


@NgModule({
  declarations: [AlertwindowComponent],
  imports: [
    CommonModule
  ],
  exports:[AlertwindowComponent],
  providers:[AlertwindowService]
})
export class AlertModule { }
