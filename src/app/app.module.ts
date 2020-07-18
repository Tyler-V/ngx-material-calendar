import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxMaterialCalendarModule } from '../../projects/ngx-material-calendar/src/public-api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, NgxMaterialCalendarModule, MatCardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
