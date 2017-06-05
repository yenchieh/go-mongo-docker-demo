import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {requestOptionsProvider} from './default-request-options.service';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdInputModule, MdButtonModule, MdCardModule} from '@angular/material';
import { ServerService } from "app/server.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdInputModule,
    MdButtonModule,
    MdCardModule
  ],
  providers: [
    ServerService,
    requestOptionsProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
