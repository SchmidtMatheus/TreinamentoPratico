import { EmployeeLeave } from './../../../../model/employee-leave.interface';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { EmployeeLeaveService } from '../../../../services/employee-leave-service/employee-leave.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-leave',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.css'],
})
export class EmployeeLeaveListComponent implements OnInit {
  public employeeLeaveList: Observable<EmployeeLeave[]>;
  public displayedColumns: string[] = [
    'employeeName',
    'clientName',
    'leaveType',
    'leaveDate',
    'returnDate',
    'numberDays',
    'type',
    'actionButtons',
  ];

  constructor(
    private serviceService: EmployeeLeaveService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeLeaveList = this.serviceService.getList();
  }

  public onAddEmployeeLeave() {
    this.router.navigate(['newEmployeeLeave']);
  }

  public onRouteEdit(id: string) {
    this.router.navigate(['editEmployeeLeave/', id]);
  }

  public onRemove(id: string) {
    this.serviceService.delete(id).subscribe(() => {
      this.employeeLeaveList = this.serviceService.getList();
    });
  }
}
