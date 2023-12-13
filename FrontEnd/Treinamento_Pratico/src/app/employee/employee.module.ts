import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './components/list/employee/employee-list.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeFormComponent } from './components/form/employee/employee-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EmployeeJobPositionComponent } from './components/form/job-position/employee-job-position.component';
import { EmployeeClientComponent } from './components/form/client/employee-client.component';
import { ClientListComponent } from './components/list/client/client-list.component';
import { JobPositionListComponent } from './components/list/job-position/job-position-list.component';
import { CPFPipe } from './components/pipes/cpfPipe/cpf.pipe';
import { EmployeeLeaveListComponent } from './components/list/employee-leave/employee-leave.component';
import { EmployeeLeaveComponent } from './components/form/employee-leave/employee-leave.component';
import { EnumPipe } from './components/pipes/enumPipe/enum.pipe';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeFormComponent,
    EmployeeJobPositionComponent,
    EmployeeClientComponent,
    ClientListComponent,
    JobPositionListComponent,
    CPFPipe,
    EmployeeLeaveListComponent,
    EmployeeLeaveComponent,
    EnumPipe,
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ]
})
export class EmployeeModule { }
