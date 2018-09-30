import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


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

    constructor(private http: HttpClient) {
    }


    write_console(msg): void {

        console.log(msg);
    }

    write_php(msg) {
        console.log(msg);
        const body = JSON.stringify(msg);
        return this.http.post(url01, body, httpOptions);

    }

    read_php() {
        return this.http.get(url02);
    }


}

