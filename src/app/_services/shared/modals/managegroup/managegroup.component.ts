import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "src/app/_services/api.service";
import { GroupService } from "src/app/_services/group.service";
import { ActivatedRoute, Params } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { Subject, combineLatest, Observable } from "rxjs";
import { GroupmembderwithaddComponent } from "../groupmembderwithadd/groupmembderwithadd.component";

@Component({
  selector: "app-managegroup",
  templateUrl: "./managegroup.component.html",
  styleUrls: ["./managegroup.component.css"],
})
export class ManagegroupComponent implements OnInit, AfterViewInit, OnDestroy {
  image: File = null;
  imagePrevie: string | ArrayBuffer;
  title: string;
  groupId: number;
  numberMembers: number;
  destroyed$ = new Subject();
  groupGet$: Observable<any>;
  membersGet$: Observable<any>;

  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.route.queryParams
      .pipe(takeUntil(this.destroyed$))
      .subscribe((params: Params) => (this.groupId = +params["groupId"]));
    this.groupService.getGroup(this.groupId);
    this.groupService.getMembers(this.groupId);
    this.groupGet$ = this.apiService.on("group/get");
    this.membersGet$ = this.apiService.on("group/members");
    combineLatest(this.groupGet$, this.membersGet$)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([group, members]) => {
        this.title = group["groups"][0]["title"];
        this.numberMembers = members["count"];
      });
  }
  onFileUpload(event: any) {
    // загрузка зображення
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePrevie = reader.result;
    };
    reader.readAsDataURL(file);
  }
  edit(edit, description) {
    this.groupService.updateGroup(this.groupId, edit, description);
    this.activeModal.close();
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  getAdministrators() {}
  getMembers() {
    this.modalService.open(GroupmembderwithaddComponent, { size: "sm" });
  }
}
