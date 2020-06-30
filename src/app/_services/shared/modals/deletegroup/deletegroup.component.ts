import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Params, ActivatedRoute, Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { GroupService } from "src/app/_services/group.service";
import { ApiService } from "src/app/_services/api.service";

@Component({
  selector: "app-deletegroup",
  templateUrl: "./deletegroup.component.html",
  styleUrls: ["./deletegroup.component.css"],
})
export class DeletegroupComponent implements OnInit, AfterViewInit {
  groupId: number;
  group: string;
  constructor(
    public activeModal: NgbActiveModal,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.route.queryParams.subscribe(
      (params: Params) => (this.groupId = +params["groupId"])
    );
    this.groupService.getGroup(this.groupId);
    this.apiService.on("group/get").subscribe((data) => {
      this.group = data["groups"][0]["title"];
    });
  }
  deleteGroup() {
    this.groupService.delGroup(this.groupId);
    this.router.navigate(["home"], {
      queryParams: {
        groupDelete: "ok",
      },
      queryParamsHandling: "merge",
    });
    this.activeModal.close();
  }
}
