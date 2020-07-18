import { TestBed } from '@angular/core/testing';

import { NgxMaterialCalendarService } from './ngx-material-calendar.service';

describe('NgxMaterialCalendarService', () => {
  let service: NgxMaterialCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxMaterialCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
