import { Component, OnInit } from '@angular/core';
import { DataSource } from './api';

@Component({
    selector: 'app-list',
    providers: [DataSource],
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    list: any[];

    constructor(private api: DataSource) {}

    ngOnInit() {}

    refresh() {
        this.api.get('http://127.0.0.1:2333/api/v1/list/sh').subscribe(data => {
            console.log(data);
            this.list = data.data;
        });
    }
}
