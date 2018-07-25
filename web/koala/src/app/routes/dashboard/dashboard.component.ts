import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { DataRespone, Record } from './interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  salesPieData = [
    {
      x: '涨幅[10,∞]',
      y: 0,
    },
    {
      x: '涨幅[5,10)',
      y: 0,
    },
    {
      x: '涨幅(0,5)',
      y: 0,
    },
    {
      x: '不变',
      y: 0,
    },
    {
      x: '降幅(0,5)',
      y: 0,
    },
    {
      x: '降幅[5,10)',
      y: 0,
    },
    {
      x: '降幅[10,∞)',
      y: 0,
    },
  ];

  city: string;

  dataSet: Record[] = [];

  total: string;

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
          this.salesPieData.map(item => {
            item.y = 0;
          });
          data.data.map(item => {
            let i = 0;
            item.change = (100 * (item.total - item.last)) / item.last;
            if (item.change >= 10) {
              i = 0;
            } else if (item.change >= 5) {
              i = 1;
            } else if (item.change > 0) {
              i = 2;
            } else if (item.change == 0) {
              i = 3;
            } else if (item.change > -5) {
              i = 4;
            } else if (item.change <= -5 && item.change > -10) {
              i = 5;
            } else {
              i = 6;
            }
            this.salesPieData[i].y += 1;
          });

          let count = this.salesPieData.reduce((pre, now) => now.y + pre, 0);
          this.total = this.format(count);

          this.dataSet = data.data;
        }
      });
  }

  search() {
    console.log(this.city);

    this.fetch(this.city);
  }

  format(val: number) {
    return `${val}套`;
  }
}
