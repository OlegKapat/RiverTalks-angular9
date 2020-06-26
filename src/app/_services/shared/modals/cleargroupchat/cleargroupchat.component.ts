import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Params } from "@angular/router";
import { MessageService, ApiService } from "src/app/_services";
import { GroupService } from "src/app/_services/group.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "app-cleargroupchat",
  templateUrl: "./cleargroupchat.component.html",
  styleUrls: ["./cleargroupchat.component.css"],
})
export class CleargroupchatComponent
  implements OnInit, AfterViewInit, OnDestroy {
  group: string;
  groupId: number;
  destroy$ = new Subject<void>();

  constructor(
    public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private groupService: GroupService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.route.queryParams.subscribe(
      (params: Params) => (this.groupId = +params["groupId"])
    );
    this.groupService.getGroup(this.groupId);
    this.apiService
      .on("group/get")
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.group = data["groups"][0]["title"];
      });
  }
  deleteChat() {}
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
