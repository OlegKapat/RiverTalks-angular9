import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-createchannel',
  templateUrl: './createchannel.component.html',
  styleUrls: ['./createchannel.component.css']
})
export class CreatechannelComponent implements OnInit {
  image:File;
  imagePrevie: string | ArrayBuffer;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  create(name){}

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
