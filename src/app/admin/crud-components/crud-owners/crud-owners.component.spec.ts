import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudOwnersComponent } from './crud-owners.component';

describe('CrudOwnersComponent', () => {
  let component: CrudOwnersComponent;
  let fixture: ComponentFixture<CrudOwnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudOwnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
