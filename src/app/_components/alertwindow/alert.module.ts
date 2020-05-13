import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertwindowComponent} from './alertwindow.component';
import {AlertwindowService} from '../../_services/alertwindow.service';


@NgModule({
  declarations: [AlertwindowComponent],
  imports: [
    CommonModule
  ],
  exports:[AlertwindowComponent],
  providers:[AlertwindowService]
})
export class AlertModule { }
