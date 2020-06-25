import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { GroupService } from "src/app/_services/group.service";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-modalforuseringroup",
  templateUrl: "./modalforuseringroup.component.html",
  styleUrls: ["./modalforuseringroup.component.css"],
})
export class ModalforuseringroupComponent
  implements OnInit, AfterViewInit, OnDestroy {
  userId: number;
  groupId: number;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => (this.userId = +params["userId"]));
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => (this.groupId = +params["groupId"]));
  }
  banUser() {
    this.groupService.banUser(this.groupId, this.userId);
    this.dialog.closeAll();
    this.router.navigate(["home"], {
      queryParams: {
        userId: undefined,
      },
      queryParamsHandling: "merge",
    });
  }
  unbanUser() {
    this.groupService.unbanUser(this.groupId, this.userId);
    this.dialog.closeAll();
    this.router.navigate(["home"], {
      queryParams: {
        userId: undefined,
      },
      queryParamsHandling: "merge",
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  kickUser(){
    this.groupService.kickUser(this.groupId, this.userId);
    this.dialog.closeAll();
    this.router.navigate(["home"], {
      queryParams: {
        userId: undefined,
      },
      queryParamsHandling: "merge",
    });
  }
}
