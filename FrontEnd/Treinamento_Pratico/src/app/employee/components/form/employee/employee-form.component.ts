import { JobPosition } from '../../../../model/job-position.interface';
import { JobPositionService } from '../../../../services/job-position-service/job-position.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../../services/employee-service/employee.service';
import { Client } from 'src/app/model/client.interface';
import { ClientService } from '../../../../services/client-service/client.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  form: FormGroup;

  public clientList: Client[];
  public jobPositionList: JobPosition[];
  public displayedColumns: string[];

  private id: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: EmployeeService,
    private serviceClient: ClientService,
    private serviceJobPosition: JobPositionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.form = this.formBuilder.group({
      name: [null],
      nationalIdentity: [null],
      clientId: [null],
      salary: [null],
      jobPositionId: [null],
      typeEmployee: [null],
      birthdate: [null],
      active: [null],
    });

    if (this.id) {
      this.service
        .getById(this.id)
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
        .subscribe((employee) => {
          this.form.patchValue(employee);
        });
    }

    this.serviceClient.getList().subscribe((clients) => {
      this.clientList = clients;
    });

    this.serviceJobPosition.getList().subscribe((jobPosition) => {
      this.jobPositionList = jobPosition;
    });
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
        .subscribe(() => this.router.navigate(['']));
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
        .subscribe(() => this.router.navigate(['']));
    }
  }

  public onBack() {
    this.router.navigate(['']);
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
  public openDialog(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }
}
