import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FocusService {

  constructor() { }
  getFocus(el){
    el.focus()
  }
  
}
