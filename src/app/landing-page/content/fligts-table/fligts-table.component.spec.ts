import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FligtsTableComponent } from './fligts-table.component';

describe('FligtsTableComponent', () => {
  let component: FligtsTableComponent;
  let fixture: ComponentFixture<FligtsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FligtsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FligtsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
