import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeClientComponent } from './employee-client.component';

describe('EmployeeClientComponent', () => {
  let component: EmployeeClientComponent;
  let fixture: ComponentFixture<EmployeeClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
