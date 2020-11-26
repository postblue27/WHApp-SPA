import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudRentersComponent } from './crud-renters.component';

describe('CrudRentersComponent', () => {
  let component: CrudRentersComponent;
  let fixture: ComponentFixture<CrudRentersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudRentersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudRentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
