import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { DataRespone, Record } from './interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  city: string;

  dataSet: Record[] = [];

  constructor(private http: _HttpClient) {
    //http.appliedUrl('http://localhost:2333/api/v1/list/');
  }

  ngOnInit() {}

  fetch(city: string) {
    this.http
      .get<DataRespone<Record[]>>(`http://localhost:2333/api/v1/list/${city}`)
      .subscribe(data => {
        console.log(data.status);
        if (data.status == 'success') {
          this.dataSet = data.data;
        }
      });
  }

  search() {
    console.log(this.city);

    this.fetch(this.city);
  }
}
