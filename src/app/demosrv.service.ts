import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import {Observable, of} from 'rxjs';
import {Row} from './row';




const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
//const url01 = './write_json.php';
//const url02 = './json.txt';
const url01 = 'http://localhost/TestHttp002/write_json.php';
const url02 = 'http://localhost/TestHttp002/read_json.php';

@Injectable({
    providedIn: 'root'
})
export class DemosrvService {

    private key = 'test';
    constructor(private http: HttpClient,
                private localStorageService: LocalStorageService) {
    }


    write_console(msg): void {

        console.log(msg);
    }

    write_local(msg) {
        const key = 'test';
        this.localStorageService.set(key, msg);
    }

    read_local(): Observable<Row[]> {
        return of(this.localStorageService.get(this.key));
    }
    /*
        write_local(msg): Observable<Row[]> {
            const key = 'test';
            this.localStorageService.set(key, msg);
            return msg;
        }

    */
    write_php(msg) {
        console.log(msg);
        const body = JSON.stringify(msg);
        return this.http.post(url01, body, httpOptions);

    }

    read_php() {
        return this.http.get(url02);
    }


}

