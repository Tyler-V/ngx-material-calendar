import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMaterialCalendarComponent } from './ngx-material-calendar.component';

describe('NgxMaterialCalendarComponent', () => {
  let component: NgxMaterialCalendarComponent;
  let fixture: ComponentFixture<NgxMaterialCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMaterialCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMaterialCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
