import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudDriversComponent } from './crud-drivers.component';

describe('CrudDriversComponent', () => {
  let component: CrudDriversComponent;
  let fixture: ComponentFixture<CrudDriversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudDriversComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
