import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../message.service';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
 
  visible=false;
  constructor(private route:ActivatedRoute, private messageService:MessageService, private apiService:ApiService) { }

  ngOnInit(): void {

  }
  
  edit(){
      this.visible=true;
      
  }
  copy(){

  }
  forward(){

  }
  delete(){

  }
  select(){

  }
}
