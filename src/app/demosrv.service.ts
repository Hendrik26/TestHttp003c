import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from 'angular-2-local-storage';
import {Observable} from 'rxjs';
import {of} from 'rxjs';
import {Row} from './row';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
//const url01 = './write_json.php';
//const url02 = './json.txt';
const url01 = 'http://localhost/TestHttp003/write_json.php';
const url02 = 'http://localhost/TestHttp003/read_json.php';
const key = 'test';

@Injectable({
    providedIn: 'root'
})
export class DemosrvService {

    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService) {
    }

    write_console(msg): void {
        console.log(msg);
    }

    read_local(): Observable<Row[]> {
        return of(this.localStorageService.get(key));
    }

    write_local(msg): Observable<boolean> {
        this.localStorageService.set(key, msg);
        return of(true);
    }

    write_php(msg) {
        const body = JSON.stringify(msg);
        return this.http.post(url01, body, httpOptions);
    }

    read_php() {
        return this.http.get(url02);
    }


}

