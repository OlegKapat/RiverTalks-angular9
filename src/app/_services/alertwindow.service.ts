import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Alert} from '../_models/alert';


@Injectable({
  providedIn: 'root'
})
export class AlertwindowService {
  alertSetings$=new Subject<Alert>()
  constructor() { }
  create(title:string,type:string,time:number,body:string){
      this.alertSetings$.next({title,type,time,body})
  }
}
