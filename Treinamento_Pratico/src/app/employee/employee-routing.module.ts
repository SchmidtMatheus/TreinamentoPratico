import { EmployeeClientComponent } from './components/form/client/employee-client.component';
import { EmployeeJobPositionComponent } from './components/form/job-position/employee-job-position.component';
import { EmployeeFormComponent } from './components/form/employee/employee-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/list/employee/employee-list.component';
import { ClientListComponent } from './components/list/client/client-list.component';
import { JobPositionListComponent } from './components/list/job-position/job-position-list.component';
import { EmployeeLeaveComponent } from './components/form/employee-leave/employee-leave.component';
import { EmployeeLeaveListComponent } from './components/list/employee-leave/employee-leave.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
  },
  {
    path: 'newEmployee',
    component: EmployeeFormComponent,
  },
  {
    path: 'editEmployee/:id',
    component: EmployeeFormComponent,
  },

  {
    path: 'employeeLeaveList',
    component: EmployeeLeaveListComponent,
  },
  {
    path: 'newEmployeeLeave',
    component: EmployeeLeaveComponent,
  },
  {
    path: 'editEmployeeLeave/:id',
    component: EmployeeLeaveComponent,
  },

  {
    path: 'jobPositionList',
    component: JobPositionListComponent,
  },
  {
    path: 'newJobPosition',
    component: EmployeeJobPositionComponent,
  },
  {
    path: 'editJobPosition/:id',
    component: EmployeeJobPositionComponent,
  },
  {
    path: 'clientList',
    component: ClientListComponent,
  },
  {
    path: 'newClient',
    component: EmployeeClientComponent,
  },
  {
    path: 'editClient/:id',
    component: EmployeeClientComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
