import { EmployeeLeave } from './../../../../model/employee-leave.interface';
import { Employee } from './../../../../model/employee.interface';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Client } from '../../../../model/client.interface';
import { EmployeeService } from '../../../../services/employee-service/employee.service';
import { ClientService } from '../../../../services/client-service/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeLeaveService } from 'src/app/services/employee-leave-service/employee-leave.service';
import { LeaveTypeEmployeeLeave } from '../../../../model/leave-type-employee-leave.enum';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-employee-leave',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.css'],
})
export class EmployeeLeaveComponent implements OnInit {
  form: FormGroup;

  public clientList: Client[];
  public employeeList: Employee[];
  public employeeLeaveList: EmployeeLeave[];
  public displayedColumns: string[] = ['name'];

  private id: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: EmployeeLeaveService,
    private serviceClient: ClientService,
    private serviceEmployee: EmployeeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.form = this.formBuilder.group({
      employeeId: [null, Validators.required],
      clientId: [null, Validators.required],
      type: [{ value: null, disabled: true }],
      leaveDate: [null, Validators.required],
      numberDays: [null],
      returnDate: [null],
      leaveType: [null, Validators.required],
    });

    this.form.get('leaveType')?.valueChanges.subscribe((value) => {
      if (value === LeaveTypeEmployeeLeave.WORK_INJURY) {
        this.form.get('type')?.enable();
        this.form.get('returnDate')?.disable();
        this.form.get('numberDays')?.disable();
      } else if (value === LeaveTypeEmployeeLeave.VACATION) {
        this.form.get('type')?.disable();
        this.form.get('type')?.setValue(null);
        this.form.get('returnDate')?.enable();
        this.form.get('numberDays')?.disable();
        if (
          this.form.get('returnDate')?.dirty &&
          this.form.get('leaveDate')?.dirty
        ) {
          this.form
            .get('numberDays')
            ?.setValue(
              (this.form.get('returnDate')?.value -
                this.form.get('leaveDate')?.value) /
                (1000 * 60 * 60 * 24)
            );
        }
      } else if (value === LeaveTypeEmployeeLeave.PATERNITY_LEAVE) {
        this.form.get('type')?.disable();
        this.form.get('type')?.setValue(null);
        this.form.get('returnDate')?.disable();
        this.form.get('numberDays')?.setValue('20');
        this.form.get('numberDays')?.disable();
        if (this.form.get('leaveDate')?.dirty) {
          this.form
            .get('returnDate')
            ?.setValue(
              new Date(
                (this.form.get('leaveDate')?.value / (1000 * 60 * 60 * 24) +
                  20) *
                  (1000 * 60 * 60 * 24)
              )
            );
        }
      } else if (value === LeaveTypeEmployeeLeave.MATERNITY_LEAVE) {
        this.form.get('type')?.disable();
        this.form.get('type')?.setValue(null);
        this.form.get('returnDate')?.disable();
        this.form.get('numberDays')?.setValue('180');
        this.form.get('numberDays')?.disable();
        if (this.form.get('leaveDate')?.dirty) {
          this.form
            .get('returnDate')
            ?.setValue(
              new Date(
                (this.form.get('leaveDate')?.value / (1000 * 60 * 60 * 24) +
                  180) *
                  (1000 * 60 * 60 * 24)
              )
            );
        }
      } else if (
        value === LeaveTypeEmployeeLeave.CONTRIBUTORS_DEATH ||
        value === LeaveTypeEmployeeLeave.TERMINATION
      ) {
        this.form.get('type')?.disable();
        this.form.get('type')?.setValue(null);
        this.form.get('returnDate')?.disable();
        this.form.get('numberDays')?.disable();
        this.form.get('numberDays')?.setValue(null);
        this.form.get('returnDate')?.setValue(null);
      } else if (value === LeaveTypeEmployeeLeave.OTHERS) {
        this.form.get('type')?.disable();
        this.form.get('type')?.setValue(null);
        this.form.get('numberDays')?.disable();
        if (
          this.form.get('returnDate')?.dirty &&
          this.form.get('leaveDate')?.dirty
        ) {
          this.form
            .get('numberDays')
            ?.setValue(
              (this.form.get('returnDate')?.value -
                this.form.get('leaveDate')?.value) /
                (1000 * 60 * 60 * 24)
            );
        }
      }

      this.form.get('returnDate')?.valueChanges.subscribe(() => {
        if (
          this.form.get('leaveDate')?.dirty &&
          (this.form.get('leaveType')?.value ==
            LeaveTypeEmployeeLeave.VACATION ||
            this.form.get('leaveType')?.value == LeaveTypeEmployeeLeave.OTHERS)
        ) {
          this.form
            .get('numberDays')
            ?.setValue(
              (this.form.get('returnDate')?.value -
                this.form.get('leaveDate')?.value) /
                (1000 * 60 * 60 * 24)
            );
        }
      });

      this.form.get('leaveDate')?.valueChanges.subscribe(() => {
        if (
          this.form.get('returnDate')?.dirty &&
          (this.form.get('leaveType')?.value ==
            LeaveTypeEmployeeLeave.VACATION ||
            this.form.get('leaveType')?.value == LeaveTypeEmployeeLeave.OTHERS)
        ) {
          this.form
            .get('numberDays')
            ?.setValue(
              (this.form.get('returnDate')?.value -
                this.form.get('leaveDate')?.value) /
                (1000 * 60 * 60 * 24)
            );
        } else if (
          this.form.get('leaveType')?.value ==
          LeaveTypeEmployeeLeave.MATERNITY_LEAVE
        ) {
          this.form
            .get('returnDate')
            ?.setValue(
              new Date(
                (this.form.get('leaveDate')?.value / (1000 * 60 * 60 * 24) +
                  180) *
                  (1000 * 60 * 60 * 24)
              )
            );
        } else if (
          this.form.get('leaveType')?.value ==
          LeaveTypeEmployeeLeave.PATERNITY_LEAVE
        ) {
          this.form
            .get('returnDate')
            ?.setValue(
              new Date(
                (this.form.get('leaveDate')?.value / (1000 * 60 * 60 * 24) +
                  20) *
                  (1000 * 60 * 60 * 24)
              )
            );
        }
      });
    });

    if (this.id) {
      this.service
        .getListbyId(this.id)
        .pipe(
          catchError((err) => {
            if (err.status == 400) {
              this.openDialog(err.error);
            } else {
              this.openDialog(err.error.message);
            }
            return throwError(err);
          })
        )
        .subscribe((employeeLeave) => {
          this.form.patchValue(employeeLeave);
        });
    }

    this.serviceClient.getList().subscribe((clients) => {
      this.clientList = clients;
    });

    this.serviceEmployee.getList().subscribe((employee) => {
      this.employeeList = employee;
    });
  }

  public getErrorMessage(formControl: FormControl) {
    if (formControl.hasError('required')) {
      return 'Campo obrigatório';
    } else if (formControl.hasError('invalid')) {
      return 'Campo inválido';
    } else {
      return null;
    }
  }

  public onClear() {
    this.form.reset();
  }

  public onSubmit() {
    if (this.id) {
      this.service
        .update(this.id, this.form.getRawValue())
        .pipe(
          catchError((err) => {
            if (err.status == 400) {
              this.openDialog(err.error);
            } else {
              this.openDialog(err.error.message);
            }
            return throwError(err);
          })
        )
        .subscribe(() => this.router.navigate(['employeeLeaveList']));
    } else {
      this.service
        .save(this.form.getRawValue())
        .pipe(
          catchError((err) => {
            if (err.status == 400) {
              this.openDialog(err.error);
            } else {
              this.openDialog(err.error.message);
            }
            return throwError(err);
          })
        )
        .subscribe(() => this.router.navigate(['employeeLeaveList']));
    }
  }

  public openDialog(errorMsg: any) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  public onBack() {
    this.router.navigate(['employeeLeaveList']);
  }
}
