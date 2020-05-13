import { Component, OnInit, Input } from '@angular/core';
import { GroupService } from 'src/app/_services/group.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-createnewgroup',
  templateUrl: './createnewgroup.component.html',
  styleUrls: ['./createnewgroup.component.css']
})
export class CreatenewgroupComponent implements OnInit {
  @Input() my_modal_title;
  image:File;
  imagePrevie: string | ArrayBuffer;
 
  constructor(private groupService:GroupService,public activeModal: NgbActiveModal, 
              private apiService:ApiService) { }

  ngOnInit(): void {
  }
  create(name){
    this.groupService.addGroup(name);
    this.apiService.on('group/new').subscribe()
    this.activeModal.close();
  }
  onFileUpload(event:any){              // загрузка зображення
    const file=event.target.files[0];
    this.image=file;

    const reader=new FileReader()
    reader.onload=()=>{
      this.imagePrevie=reader.result;
    }
    reader.readAsDataURL(file)
 }

}
