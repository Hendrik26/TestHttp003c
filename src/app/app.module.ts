import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormularComponent } from './formular/formular.component';


// manuell hinugefügt
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FormularComponent
  ],
  imports: [
    BrowserModule,

//   manuell hinugefügt
     FormsModule,
      HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
