import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { NgxMaterialCalendarComponent } from './ngx-material-calendar/ngx-material-calendar.component';
import { MomentPipe } from './shared/pipes/moment.pipe';
import { MonthDateDatePipe } from './shared/pipes/month-day-date.pipe';

@NgModule({
  declarations: [NgxMaterialCalendarComponent, MomentPipe, MonthDateDatePipe],
  imports: [CommonModule, FlexLayoutModule, MatButtonModule, MatIconModule, MatMenuModule],
  exports: [NgxMaterialCalendarComponent],
})
export class NgxMaterialCalendarModule {}
