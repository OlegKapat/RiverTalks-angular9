import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ApiService, ContactService } from "src/app/_services";
import { takeUntil } from "rxjs/operators";
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'src/app/_services/group.service';

@Component({
  selector: "app-addmembertogroup",
  templateUrl: "./addmembertogroup.component.html",
  styleUrls: ["./addmembertogroup.component.css"],
})
export class AddmembertogroupComponent implements OnInit, AfterViewInit {
  search = "";
  initialAvatarText: string;
  initialAvatarImage: string;
  selectedIndex: number = null;
  contactform: any[] = [];
  allcontacts$: Observable<any[]>;
  destroyed$ = new Subject();
  groupId:number;
  userId:number;


  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService,
    private contactService: ContactService,
    public modal: NgbModal,
    private route:ActivatedRoute,
    private router:Router,
    private groupService:GroupService
  ) {}

  ngOnInit(): void {
    this.contactService.getContacts();
    this.allcontacts$ = this.apiService.on("contact/get");
    this.allcontacts$.pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      this.contactform = [...data["contacts"]];
      if (this.contactform) {
        this.contactform.forEach((value) => {
          if (value["user"]["avatar"]["file"]["url"] == "") {
            value.sign = this.transformAvatar(value["user"]["name"]);
          } else {
            value.url = value["user"]["avatar"]["file"]["url"];
          }
        });
      }
    });
  }
  ngAfterViewInit() {
    this.route.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(data=>this.groupId=+data['groupId'])
    this.route.queryParams.pipe(takeUntil(this.destroyed$)).subscribe(data=>this.userId=+data['userId'])
  }
  setIndex(index: number) {
    this.selectedIndex = index;
  }
  getId(id){
    this.router.navigate(['home'],{queryParams:{
      userId:id
  },  queryParamsHandling: 'merge',})
    
  }
  transformAvatar(name: string): string {
    var str = name.split(" ");
    var first = "";
    var second = "";
    switch (str.length) {
      case 1:
        first = str[0][0].toUpperCase();
        break;
      case 2:
        (first = str[0][0].toUpperCase()), (second = str[1][0].toUpperCase());
        break;
      default:
        "U";
    }
    return (this.initialAvatarText = first + second);
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  addToGroup() {
    this.groupService.inviteGroup(this.groupId,this.userId)
  }
}
