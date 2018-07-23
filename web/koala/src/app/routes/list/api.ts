import { Response, Headers, Http, URLSearchParams } from '@angular/http';
import {
    ActivatedRoute,
    Router,
    ActivatedRouteSnapshot,
    RouterState,
    RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DataSource {
    constructor(private _http: Http, private _router: Router) {}

    get(url: string): Observable<any> {
        return this._http.get(url).pipe(map((response: Response) => response.json()));
    }
}
