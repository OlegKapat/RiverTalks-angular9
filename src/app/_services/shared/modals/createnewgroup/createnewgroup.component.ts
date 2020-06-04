import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GroupService } from 'src/app/_services/group.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/_services/api.service';


@Component({
  selector: 'app-createnewgroup',
  templateUrl: './createnewgroup.component.html',
  styleUrls: ['./createnewgroup.component.css']
})
export class CreatenewgroupComponent implements OnInit,AfterViewInit {
  @Input() my_modal_title;
  @ViewChild('groupname') sinhalaTextInput: ElementRef;
  image:File=null;
  imagePrevie: string | ArrayBuffer;
  newstr:string="";
 
  constructor(private groupService:GroupService,public activeModal: NgbActiveModal, 
              private apiService:ApiService) {}

  ngOnInit(): void {
    
  }
  ngAfterViewInit(){
    
  }
  create(name){
    this.groupService.addGroup(name,this.newstr);
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
   translit(str){
    var ru = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 
      'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i', 
      'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 
      'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 
      'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 
      'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
  }, n_str = [];
  
  str = str.replace(/[ъь]+/g, '').replace(/й/g, 'i');
  
  for ( var i = 0; i < str.length; ++i ) {
     n_str.push(
            ru[ str[i] ]
         || ru[ str[i].toLowerCase() ] == undefined && str[i]
         || ru[ str[i].toLowerCase() ].replace(/^(.)/, function ( match ) { return match.toUpperCase() })
     );
  }
  
     return this.newstr= n_str.join('');
   }
}
