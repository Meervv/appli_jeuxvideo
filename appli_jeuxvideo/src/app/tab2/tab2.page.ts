import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {

  jeuData: any = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  submit() {
    this.http.post('http://localhost:3000/new/jeux', this.jeuData).subscribe((res: any) => {
      console.log(res);
    })
  }
}
