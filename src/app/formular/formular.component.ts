import {Component, OnInit} from '@angular/core';
import {DemosrvService} from '../demosrv.service';
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
    buttonDisabled = true;


    write_con() {
        this._demosrv.write_console(this.rows);
        console.log('write_con finished');
    }

    write_loc() {
        this.buttonDisabled = true;
        let msg = this.rows;
        this._demosrv.write_local(msg).subscribe(
            data => {
                console.log('data saved successfully');
                return data;
            },
            error => {
                console.error('Error saving data');
                return false;
            },
            () => {
                this.buttonDisabled = false;
            }
        );
    }

    read_loc() {
        this.buttonDisabled = true;
        this._demosrv.read_local().subscribe(
            data => {
                if (data !== null) {
                    this.rows = data;
                }
            },
            err => console.error(err),
            () => {
                console.log('done load data');
                this.buttonDisabled = false;
            }
        );
    }

    write_srvr() {
        this.buttonDisabled = true;
        const msg = this.rows;
        this._demosrv.write_php(msg).subscribe(
            data => {
                console.log('data saved successfully');
                return true;
            },
            error => {
                console.error('Error saving data');
                return Observable.throw(error);
            },
            () => {
                this.buttonDisabled = false;
            }
        );
    }

    read_srvr() {
        this.buttonDisabled = true;
        this._demosrv.read_php().subscribe(
            data => {
                if (data !== null) {
                    this.rows = data;
                }
            },
            err => console.error(err),
            () => {
                console.log('done load data');
                this.buttonDisabled = false;
            }
        );
    }

    write_srvr_db() {
        this.buttonDisabled = true;
        let msg = this.rows;
        this._demosrv.write_php_db(msg).subscribe(
            data => {
                console.log('data saved successfully');
                return true;
            },
            error => {
                console.error('Error saving data');
                return Observable.throw(error);
            },
            () => {
                this.buttonDisabled = false;
            }
        );
    }

    read_srvr_db() {
        this.buttonDisabled = true;
        this._demosrv.read_php_db().subscribe(
            data => {
                if (data !== null) {
                    this.rows = data;
                }
            },
            err => console.error(err),
            () => {
                console.log('done load data');
                this.buttonDisabled = false;
            }
        );
    }

    addZeile(): void {
        if (this.input01 === '') {return; }
        if (this.input02 === '') {return; }
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

    constructor(public _demosrv: DemosrvService) {
    }

    ngOnInit() {
        this.input01 = '';
        this.input02 = '';
        this.rows = [] as Row[]; //create empty array from type 'Row'
        this.read_srvr();
    }

}
