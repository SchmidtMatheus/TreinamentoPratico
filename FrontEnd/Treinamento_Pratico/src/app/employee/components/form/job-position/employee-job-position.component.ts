import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JobPositionService } from '../../../../services/job-position-service/job-position.service';

@Component({
  selector: 'app-employee-job-position',
  templateUrl: './employee-job-position.component.html',
  styleUrls: ['./employee-job-position.component.css'],
})
export class EmployeeJobPositionComponent implements OnInit {
  formJobPosition: FormGroup;
  private id: string;
  constructor(
    private FormBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private serviceJobPosition: JobPositionService,
    private router: Router
  ) {
    this.formJobPosition = this.FormBuilder.group({
      name: [null],
    });
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.serviceJobPosition.getListbyId(this.id).subscribe((JobPosition) => {
        this.formJobPosition.patchValue(JobPosition);
      });
    }
  }

  onClear() {
    this.formJobPosition.reset();
  }

  public onSubmit() {
    if (this.id) {
      this.serviceJobPosition
        .update(this.id, this.formJobPosition.value)
        .subscribe(() => this.router.navigate(['jobPositionList']));
    } else {
      this.serviceJobPosition
        .save(this.formJobPosition.value)
        .subscribe(() => this.router.navigate(['jobPositionList']));
    }
  }

  onBack() {
    this.router.navigate(['jobPositionList']);
  }
}
