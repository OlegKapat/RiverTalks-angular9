import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  public page;
  private _pages = {};

  constructor(
    public dialogRef: MatDialogRef<PageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    if (this._pages[this.data.page]) {
      this.page = this._pages[this.data.page];
      console.log(this.page );

      return;
    } else {
      this.page = {};
    }
    this.http.get(environment.site + this.data.page + '.html').subscribe(data => {
      this._pages[this.data.page] = data;
      this.page = data;
    })
  }

}
