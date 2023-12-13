import { Employee } from '../../../../model/employee.interface';
import { EmployeeService } from '../../../../services/employee-service/employee.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { ClientService } from '../../../../services/client-service/client.service';
import { Client } from '../../../../model/client.interface';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})


export class EmployeeListComponent implements OnInit {
  public clientList: Client[];
  public employeeList: Observable<Employee[]>;
  public displayedColumns: string[] = [
    'id',
    'actionButtons',
    'name',
    'nationalIdentity',
    'typeEmployee',
  ];


  constructor(
    private serviceService: EmployeeService,
    private serviceClient: ClientService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.employeeList = this.serviceService.getList();
    this.serviceClient.getList().subscribe((clients) => {
      this.clientList = clients;
    });
  }

  public onAddEmployee() {
    this.router.navigate(['newEmployee']);
  }

  public onRouteEdit(id: string) {
    this.router.navigate(['editEmployee/', id]);
  }

  public onRemove(id: string) {
    this.serviceService.delete(id).subscribe(() => {
      this.employeeList = this.serviceService.getList();
    });
  }

  /*public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employeeList = filterValue.trim().toLowerCase();
  }*/

  @ViewChild(MatPaginator) paginator: MatPaginator;
}
