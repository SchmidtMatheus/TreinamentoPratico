import { JobPositionService } from '../../../../services/job-position-service/job-position.service';
import { JobPosition } from '../../../../model/job-position.interface';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-position-list',
  templateUrl: './job-position-list.component.html',
  styleUrls: ['./job-position-list.component.css'],
})
export class JobPositionListComponent implements OnInit {
  public jobPositionList: Observable<JobPosition[]>;
  public displayedColumns: string[] = ['id', 'name', 'actionButtons'];

  constructor(
    private serviceService: JobPositionService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.jobPositionList = this.serviceService.getList();
  }
  public onAddJobPosition() {
    this.router.navigate(['newJobPosition']);
  }
  public onRouteEdit(id: string) {
    this.router.navigate(['editJobPosition/', id]);
  }

  public onRemove(id: string) {
    this.serviceService.delete(id).subscribe(() => {
      this.jobPositionList = this.serviceService.getList();
    });
  }
}
