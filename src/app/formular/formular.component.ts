import { Component, OnInit } from '@angular/core';
import { DemosrvService } from '../demosrv.service';
import {Observable} from 'rxjs/Rx';
import {Row} from '../row';

@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.css']
})
export class FormularComponent implements OnInit {
    rows;
    input01: string;
    input02: string;


    write_con() {
        this._demosrv.write_console(this.rows);
        console.log('write_con finished');
    }

    write_srvr() {
        let msg = this.rows;
        this._demosrv.write_php(msg).subscribe(
            data => {
                return true;
            },
            error => {
                console.error('Error saving data');
                return Observable.throw(error);
            }
        );
    }

    read_srvr() {
        this._demosrv.read_php().subscribe(
            // the first argument is a function which runs on success
            data => {
                this.rows = data;
            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done load data')
        );
    }


    addZeile(): void {
        if (this.input01 === '') return;
        if (this.input02 === '') return;
        this.rows.push({column01: this.input01.trim(), column02: this.input02.trim()});
        this.input01 = '';
        this.input02 = '';
        console.log('Zeile hinzugefügt');

    }

    delZeile(index): void {
        if (confirm('Zeile ' + (index + 1) + ' löschen?')) {
            this.rows.splice(index, 1);
        }
    }

    constructor(public _demosrv: DemosrvService) { }

    ngOnInit() {
        this.input01 = '';
        this.input02 = '';
        this.rows = [] as Row[]; //create empty array from type 'Row'
        this.read_srvr();
    }

}
