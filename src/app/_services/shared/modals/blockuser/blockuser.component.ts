import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import { BlacklistService } from 'src/app/_services/blacklist.service';

@Component({
  selector: 'app-blockuser',
  templateUrl: './blockuser.component.html',
  styleUrls: ['./blockuser.component.css']
})
export class BlockuserComponent implements OnInit,AfterViewInit {
  userId:number;
  constructor(public activeModal:NgbActiveModal, private route :ActivatedRoute,
              private blackListService:BlacklistService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.route.queryParams.subscribe((params:Params)=>{this.userId=params['userId']})
  }
  block(){
    this.blackListService.blockContact(this.userId);
  }
}
