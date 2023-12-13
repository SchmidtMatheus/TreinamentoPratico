import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeJobPositionComponent } from './employee-job-position.component';

describe('EmployeeJobPositionComponent', () => {
  let component: EmployeeJobPositionComponent;
  let fixture: ComponentFixture<EmployeeJobPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeJobPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeJobPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
